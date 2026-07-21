export interface ExtractedInfo {
  courseName: string;
  instructorName: string;
  lectureNumber: string;
  lectureTitle: string;
  rawText: string;
}

function cleanText(text: string): string {
  return text.replace(/\s+/g, " ").replace(/\n+/g, "\n").trim();
}

function extractPatterns(text: string): Partial<ExtractedInfo> {
  const result: Partial<ExtractedInfo> = {};

  // Course name patterns
  const coursePatterns = [
    /(?:مقرر|مادة|course|subject)[:\s]+(.+)/i,
    /(?:مقدمة في|أساسيات|نظريات|تطبيقات)\s+(.+)/i,
    /(?:CS|MATH|PHYS|ENG|IT|IS)\s*\d{3}/i,
  ];
  for (const pattern of coursePatterns) {
    const match = text.match(pattern);
    if (match) {
      result.courseName = match[1]?.trim() || match[0].trim();
      break;
    }
  }

  // Instructor name patterns
  const instructorPatterns = [
    /(?:د\.|دكتور|professor|prof\.|الدكتور|الاستاذ|استاذ|instructor|taught by|taught by prof)\s*[:\s]?\s*([\u0600-\u06FF\s\.]+?)(?:\n|$|,|\.)/i,
    /(?:د\.|الدكتور)\s+([\u0600-\u06FF\s]+)/i,
    /(?:professor|prof)\.?\s+([A-Za-z\s]+?)(?:\n|$|,)/i,
  ];
  for (const pattern of instructorPatterns) {
    const match = text.match(pattern);
    if (match) {
      result.instructorName = (match[1] || match[0]).trim().replace(/^د\.\s*/, "").trim();
      break;
    }
  }

  // Lecture number patterns
  const numberPatterns = [
    /(?:lecture|محاضرة|session|lecture no\.?|lecture #)\s*[:\s#]*(\d+)/i,
    /(?:المحاضرة)\s+(?:رقم\s+)?(\d+)/i,
    /(?:week|الأسبوع)\s+(\d+)/i,
  ];
  for (const pattern of numberPatterns) {
    const match = text.match(pattern);
    if (match) {
      result.lectureNumber = match[1];
      break;
    }
  }

  // Lecture title patterns - look for lines after "title" or after lecture number
  const titlePatterns = [
    /(?:عنوان|title|topic|محور|محور الدراسة)[:\s]+(.+)/i,
    /(?:lecture|محاضرة)\s*\d+\s*[:\s-]+\s*(.+)/i,
  ];
  for (const pattern of titlePatterns) {
    const match = text.match(pattern);
    if (match) {
      result.lectureTitle = match[1].trim();
      break;
    }
  }

  return result;
}

async function extractFromPDF(file: File): Promise<string> {
  try {
    const pdfjsLib = await import("pdfjs-dist");

    const arrayBuffer = await file.arrayBuffer();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdf = await pdfjsLib.getDocument(arrayBuffer as any).promise;

    let text = "";
    const pagesToRead = Math.min(pdf.numPages, 3);

    for (let i = 1; i <= pagesToRead; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item: any) => item.str).join(" ") + "\n";
    }

    return cleanText(text);
  } catch {
    return "";
  }
}

async function extractFromPPTX(file: File): Promise<string> {
  try {
    const JSZip = (await import("jszip")).default;
    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);

    let text = "";
    const slides = Object.keys(zip.files)
      .filter((name) => name.match(/ppt\/slides\/slide\d+\.xml$/))
      .sort()
      .slice(0, 3);

    for (const slidePath of slides) {
      const xml = await zip.file(slidePath)!.async("text");
      const textMatches = xml.match(/<a:t[^>]*>([^<]+)<\/a:t>/g);
      if (textMatches) {
        text += textMatches
          .map((m: string) => m.replace(/<[^>]+>/g, ""))
          .join(" ") + "\n";
      }
    }

    return cleanText(text);
  } catch {
    return "";
  }
}

async function extractFromDOCX(file: File): Promise<string> {
  try {
    const mammoth = await import("mammoth");
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return cleanText(result.value.slice(0, 3000));
  } catch {
    return "";
  }
}

export async function extractInfoFromFile(file: File): Promise<ExtractedInfo> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  let rawText = "";

  if (ext === "pdf") {
    rawText = await extractFromPDF(file);
  } else if (ext === "pptx") {
    rawText = await extractFromPPTX(file);
  } else if (ext === "docx" || ext === "doc") {
    rawText = await extractFromDOCX(file);
  }

  const patterns = extractPatterns(rawText);

  return {
    courseName: patterns.courseName || "",
    instructorName: patterns.instructorName || "",
    lectureNumber: patterns.lectureNumber || "",
    lectureTitle: patterns.lectureTitle || "",
    rawText: rawText.slice(0, 1000),
  };
}

export async function extractInfoFromFiles(
  files: File[]
): Promise<ExtractedInfo> {
  const merged: ExtractedInfo = {
    courseName: "",
    instructorName: "",
    lectureNumber: "",
    lectureTitle: "",
    rawText: "",
  };

  for (const file of files) {
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (!["pdf", "pptx", "docx", "doc"].includes(ext)) continue;

    const info = await extractInfoFromFile(file);

    if (!merged.courseName && info.courseName) merged.courseName = info.courseName;
    if (!merged.instructorName && info.instructorName) merged.instructorName = info.instructorName;
    if (!merged.lectureNumber && info.lectureNumber) merged.lectureNumber = info.lectureNumber;
    if (!merged.lectureTitle && info.lectureTitle) merged.lectureTitle = info.lectureTitle;

    if (merged.courseName && merged.instructorName && merged.lectureNumber && merged.lectureTitle) break;
  }

  return merged;
}
