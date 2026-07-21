"use client";

import { useState, useCallback, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";
import {
  Upload,
  FileText,
  Search,
  Filter,
  Calendar,
  Paperclip,
  X,
  Download,
  Eye,
  Trash2,
  Plus,
  ChevronDown,
  Video,
  Image,
  File,
  Music,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { extractInfoFromFiles } from "@/lib/extract-info";
import { Sparkles } from "lucide-react";
import { LEVEL_1_COURSES, ACCEPTED_FILE_TYPES } from "@/lib/constants";
import { FileViewer, getFileType, getFileUrl } from "@/components/file-viewer";

interface TerminologyTerm {
  termAr: string;
  termEn: string;
  pronunciation: string;
  definition: string;
  explanation: string;
  examples: string;
  characteristics: string;
  source: string;
}

const LECTURE_1_TERMINOLOGY: TerminologyTerm[] = [
  {
    termAr: "الوسائط التفاعلية",
    termEn: "Interactive Media",
    pronunciation: "إنترأكتيف ميديا",
    definition: "وسائط رقمية تسمح للمستخدم بالتفاعل مع المحتوى بدلاً من مجرد استقباله بشكل سلبي",
    explanation: "في الإعلام التقليدي: الاتجاه أحادي الجانب (من المصدر إلى الجمهور فقط). الدور: المرسل ينشر والجمهور يستهلك فقط. المرونة: الخبر إذا طُبع لا يمكن تعديله. في الإعلام الرقمي: الاتجاه متعدد الأطراف دائري (Networked & Interactive). الدور: المتابع يتحول من مستهلك إلى صانع محتوى (Prosumer) عبر التعليق والمشاركة وإعادة الصياغة. المرونة: المحتوى حي وقابل للتعديل والتحديث والتحليل اللحظي.",
    examples: "مواقع الويب التفاعلية، تطبيقات الهواتف الذكية، ألعاب الفيديو، الواقع الافتراضي VR، الواقع المعزز AR، منصات التواصل الاجتماعي",
    characteristics: "التفاعلية اللحظية، التحكم المستخدم، المحتوى الديناميكي، التخصيص حسب المستخدم، قابلية التوسع",
    source: "المحاضرة - د. أحمد الشريف"
  },
  {
    termAr: "حلقة رجع الصدى",
    termEn: "Feedback Loop",
    pronunciation: "فيدباك لوب",
    definition: "عملية تبادل مستمر بين صانع المحتوى والجمهور حيث يصبح المستقبل مرسلًا في بيئة رقمية",
    explanation: "نموذج الاتصال الجديد (Digital Communication Loop): [صانع المحتوى / المنصة] ────(رسالة وسائط متعددة)────► [المستقبل / الجمهور] ثم يعود التفاعل / رجع الصدى اللحظي (Feedback) إلى صانع المحتوى. هذا يختلف عن النموذج التقليدي الخطية.",
    examples: "ردود الفعل على وسائل التواصل الاجتماعي، التقييمات والمراجعات، التعليقات على المقالات، استبيانات الرأي، نتائج المشاهدة اللحظية",
    characteristics: "الفورية، التكرار، التأثير المتبادل، التعلم من المخرجات، التكيف مع المستخدم",
    source: "المحاضرة - د. أحمد الشريف"
  },
  {
    termAr: "المُنتِج-المُستهلِك",
    termEn: "Prosumer",
    pronunciation: "بروسيومر",
    definition: "مصطلح يصف المستخدم الذي يجمع بين دور المنتج والمستهلك في آن واحد في الإعلام الرقمي",
    explanation: "في الإعلام الرقمي تحول المتابع من مجرد مستهلك إلى صانع ومشارك للمحتوى عبر التعليق، المشاركة، وإعادة الصياغة. مزيج من Producer وConsumer. ينتج المحتوى الرقمي ويستهلكه في الوقت نفسه.",
    examples: "مدونو اليوتيوب، كتّاب المدونات، مستخدمو تيك توك، منشئو المحتوى على إنستغرام، مستخدمو X (تويتر) الذين يشاركون ويعلقون",
    characteristics: "الإنتاج والاستهلاك المتزامن، التحكم في المحتوى، الإبداع المستمر، المشاركة المجتمعية",
    source: "المحاضرة - د. أحمد الشريف"
  },
  {
    termAr: "الوسائط المتعددة",
    termEn: "Multimedia Integration",
    pronunciation: "مالتي ميديا إن티جريشن",
    definition: "دمج عناصر المحتوى الرقمي الناجح التي لا تعتمد على عنصر واحد بل تدمج النص والصوت والصور والفيديو التفاعلي",
    explanation: "من الخصائص الجوهرية للوسائط الرقمية. المحتوى الرقمي الناجح لا يعتمد على عنصر واحد؛ بل يدمج النص، الصوت، الصور، والفيديو التفاعلي لتعزيز الفكرة.",
    examples: "فيديوهات اليوتيوب مع تعليقات صوتية ونصوص تفاعلية، العروض التقديمية التفاعلية، المقالات الرقمية مع صور وفيديو",
    characteristics: "تنوع العناصر، تعزيز الرسالة، تجربة مستخدم غنية، تفاعلية عالية",
    source: "المحاضرة - د. أحمد الشريف"
  },
  {
    termAr: "التشعب والترابط",
    termEn: "Hypertextuality",
    pronunciation: "هايبرتيكستيواليتي",
    definition: "إمكانية تنقل القارئ بين النصوص والمراجع والمصادر فورًا عبر الروابط المباشرة دون الانفصال عن الموضوع",
    explanation: "من الخصائص الجوهرية للوسائط الرقمية. أساس عمل الويب حيث يمكن للمستخدم النقر على رابط للانتقال إلى محتوى آخر، مما يخلق تجربة تنقل غير خطية.Hyperlinks) دون الانفصال عن الموضوع الأصلي.",
    examples: "روابط الويب، المقالات المترابطة، الموسوعات الرقمية، قوائم المحتوى المقترح، المراجع في الأبحاث الرقمية",
    characteristics: "التشعب، عدم الخطية، الروابط التشعبية، التنقل الحر، بنية المحتوى المتعددة",
    source: "المحاضرة - د. أحمد الشريف"
  },
  {
    termAr: "التحليل المبني على البيانات",
    termEn: "Data-Driven Content",
    pronunciation: "ديتا دريفن كونتنت",
    definition: "كل كلمة أو تصميم يتأثر بالبيانات (نسبة المشاهدة، وقت الاحتفاظ بالجمهور، التفاعلات) والجمهور يوجه الخوارزميات",
    explanation: "من الخصائص الجوهرية للوسائط الرقمية. Retention Rate: نسبة الاحتفاظ بالجمهور. كل كلمة أو تصميم يتأثر بالبيانات، والجمهور هو من يوجه الخوارزميات لما يريد رؤيته.",
    examples: "تحليلات يوتيوب، إحصائيات إنستغرام، تقارير مشاهدات تيك توك، بيانات تفاعل المستخدمين على المواقع",
    characteristics: "القياس المستمر، التحسين المبني على البيانات، فهم سلوك الجمهور، التكيف اللحظي",
    source: "المحاضرة - د. أحمد الشريف"
  },
];

const LECTURE_1_ATTACHMENTS = [
  { name: "Digital_Media_Architecture.pdf", type: "pdf", size: "13.6 MB", description: "هيكل الإعلام الرقمي وتطوره - ملف PDF رئيسي" },
  { name: "Digital_Media_Evolution.pdf", type: "pdf", size: "12.8 MB", description: "تطور الوسائط الرقمية عبر العصور - ملف PDF رئيسي" },
  { name: "NotebookLM Mind Map.png", type: "image", size: "1.4 MB", description: "خريطة ذهنية من NotebookLM لمفاهيم الإعلام الرقمي" },
  { name: "خريطة_الذكاء_الاصطناعي_في_الإعلام.png", type: "image", size: "4.4 MB", description: "خريطة ذهنية للذكاء الاصطناعي في الإعلام" },
  { name: "ملف_صوتي_محاضرة_مدخل_الإعلام_الرقمي.m4a", type: "audio", size: "26.6 MB", description: "تسجيل صوتي للمحاضرة - ملف M4A" },
];

function getFileIcon(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  if (["mp4", "avi", "mov", "mkv"].includes(ext)) return <Video className="w-4 h-4" />;
  if (["png", "jpg", "jpeg", "gif", "svg", "webp"].includes(ext)) return <Image className="w-4 h-4" />;
  if (["pdf"].includes(ext)) return <FileText className="w-4 h-4" />;
  if (["ppt", "pptx"].includes(ext)) return <FileText className="w-4 h-4" />;
  if (["doc", "docx"].includes(ext)) return <FileText className="w-4 h-4" />;
  if (["mp3", "wav", "ogg", "m4a"].includes(ext)) return <Music className="w-4 h-4" />;
  return <File className="w-4 h-4" />;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} بايت`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} كيلوبايت`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} ميغابايت`;
}

export default function LecturesPage() {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [lectures, setLectures] = useState<{
    id: number;
    number: number;
    title: string;
    course: string;
    instructor: string;
    date: string;
    notes: string;
    files: string[];
    terminology?: TerminologyTerm[];
    attachments?: { name: string; type: string; size: string; description: string }[];
  }[]>([
    {
      id: 1,
      number: 1,
      title: "مدخل إلى الإعلام الرقمي والاتصال الجماهيري",
      course: "مدخل إلى الإعلام الرقمي والاتصال الجماهيري",
      instructor: "د. أحمد الشريف",
      date: "2026-07-26",
      notes: "المحور الأول: تحول الإعلام من خطى إلى تفاعلي. المحور الثاني: الخصائص الجوهرية للوسائط الرقمية (الوسائط المتعددة، التشعب والترابط، التحليل المبني على البيانات). المحور الثالث: نموذج الاتصال الجديد (Digital Communication Loop). التطبيق العلمي: مقارنة تغطية خبر تقليدي vs رقمي.",
      files: LECTURE_1_ATTACHMENTS.map(a => a.name),
      terminology: LECTURE_1_TERMINOLOGY,
      attachments: LECTURE_1_ATTACHMENTS,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState<typeof lectures[0] | null>(null);
  const [viewingFile, setViewingFile] = useState<{ name: string; url: string } | null>(null);

  const [form, setForm] = useState({
    course: "",
    instructor: "",
    number: "",
    title: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
    recordingLink: "",
  });
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedFrom, setExtractedFrom] = useState("");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setDroppedFiles((prev) => [...prev, ...acceptedFiles]);

    const extractable = acceptedFiles.filter((f) => {
      const ext = f.name.split(".").pop()?.toLowerCase();
      return ["pdf", "pptx", "docx", "doc"].includes(ext || "");
    });

    if (extractable.length === 0) return;

    setIsExtracting(true);
    try {
      const info = await extractInfoFromFiles(extractable);
      setForm((prev) => {
        const next = { ...prev };
        if (info.courseName && !next.course) next.course = info.courseName;
        if (info.instructorName && !next.instructor) next.instructor = info.instructorName;
        if (info.lectureNumber && !next.number) next.number = info.lectureNumber;
        if (info.lectureTitle && !next.title) next.title = info.lectureTitle;
        return next;
      });

      const found = [info.courseName, info.instructorName, info.lectureTitle].filter(Boolean);
      if (found.length > 0) {
        setExtractedFrom(extractable[0].name);
        toast.success(`تم استخراج: ${found.join("، ")}`);
      }
    } catch {
    } finally {
      setIsExtracting(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    multiple: true,
  });

  const removeFile = (index: number) => {
    setDroppedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.course) {
      toast.error("يرجى إدخال اسم المقرر");
      return;
    }
    if (!form.number) {
      toast.error("يرجى إدخال رقم المحاضرة");
      return;
    }
    if (!form.title) {
      toast.error("يرجى إدخال عنوان المحاضرة");
      return;
    }

    setIsUploading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newLecture = {
      id: Date.now(),
      number: Number(form.number),
      title: form.title,
      course: form.course,
      instructor: form.instructor,
      date: form.date,
      notes: form.notes || "",
      files: droppedFiles.map((f) => f.name),
    };

    setLectures((prev) => [newLecture, ...prev]);
    setForm({ course: "", instructor: "", number: "", title: "", date: new Date().toISOString().split("T")[0], notes: "", recordingLink: "" });
    setDroppedFiles([]);
    setIsUploading(false);
    setFormOpen(false);

    toast.success("تم رفع المحاضرة بنجاح!");
  };

  const handleDelete = (id: number) => {
    setLectures((prev) => prev.filter((l) => l.id !== id));
    toast.success("تم حذف المحاضرة");
  };

  const courseNames = useMemo(() => {
    const names = new Set(lectures.map((l) => l.course));
    return Array.from(names);
  }, [lectures]);

  const filteredLectures = useMemo(() => {
    return lectures.filter((lecture) => {
      const matchesSearch =
        !searchQuery ||
        lecture.title.includes(searchQuery) ||
        lecture.course.includes(searchQuery) ||
        lecture.notes.includes(searchQuery);
      const matchesCourse = !filterCourse || lecture.course === filterCourse;
      return matchesSearch && matchesCourse;
    });
  }, [lectures, searchQuery, filterCourse]);

  return (
    <div className="min-h-screen bg-swiss-gray p-6" dir="rtl">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#FFFFFF",
            color: "#212121",
            border: "2px solid #E0E0E0",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          },
        }}
      />

      {selectedLecture && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={() => setSelectedLecture(null)}>
          <div className="bg-white border-4 border-swiss-yellow w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b-4 border-swiss-green p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-swiss-yellow flex items-center justify-center">
                  <span className="text-swiss-black font-bold text-2xl">{selectedLecture.number}</span>
                </div>
                <div>
                  <h2 className="text-swiss-black font-bold text-xl uppercase tracking-wider">{selectedLecture.title}</h2>
                  <p className="text-swiss-gray-lighter text-sm uppercase tracking-widest">{selectedLecture.course} — {selectedLecture.instructor}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedLecture(null)} className="text-swiss-gray-lighter hover:text-swiss-yellow">
                <X className="w-6 h-6" />
              </Button>
            </div>

            <div className="p-6 space-y-8">
              <div className="bg-swiss-gray border-r-4 border-swiss-yellow p-5">
                <h3 className="text-swiss-black font-bold text-xl uppercase tracking-wider mb-2">المعلومات الأساسية</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="font-bold text-swiss-yellow">المقرر:</span> <span className="text-swiss-gray-lighter">{selectedLecture.course}</span></div>
                  <div><span className="font-bold text-swiss-green">المحاضر:</span> <span className="text-swiss-gray-lighter">{selectedLecture.instructor}</span></div>
                  <div><span className="font-bold text-swiss-blue">رقم المحاضرة:</span> <span className="text-swiss-gray-lighter">{selectedLecture.number}</span></div>
                  <div><span className="font-bold text-swiss-pink">المدة:</span> <span className="text-swiss-gray-lighter">90 دقيقة</span></div>
                </div>
              </div>

              <div>
                <h3 className="text-swiss-yellow font-bold text-lg uppercase tracking-wider mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  المحور الأول: كيف تحول الإعلام من "خطي" إلى "تفاعلي"؟
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-swiss-gray border-r-4 border-swiss-pink p-4">
                    <h4 className="text-swiss-pink font-bold text-sm uppercase tracking-wider mb-2">في الإعلام التقليدي (التلفزيون، الصحف، الراديو)</h4>
                    <ul className="space-y-2 text-sm text-swiss-gray-lighter">
                      <li className="flex items-start gap-2"><span className="text-swiss-pink font-bold">•</span> <span><strong className="text-swiss-black">الاتجاه:</strong> أحادي الجانب (من المصدر إلى الجمهور فقط)</span></li>
                      <li className="flex items-start gap-2"><span className="text-swiss-pink font-bold">•</span> <span><strong className="text-swiss-black">الدور:</strong> المرسل ينشر والجمهور يستهلك فقط دون قدرة على الرد</span></li>
                      <li className="flex items-start gap-2"><span className="text-swiss-pink font-bold">•</span> <span><strong className="text-swiss-black">المرونة:</strong> الخبر إذا طُبع لا يمكن تعديله فورًا</span></li>
                    </ul>
                  </div>
                  <div className="bg-swiss-gray border-r-4 border-swiss-green p-4">
                    <h4 className="text-swiss-green font-bold text-sm uppercase tracking-wider mb-2">في الإعلام الرقمي (السوشيال ميديا، الصحافة الرقمية)</h4>
                    <ul className="space-y-2 text-sm text-swiss-gray-lighter">
                      <li className="flex items-start gap-2"><span className="text-swiss-green font-bold">•</span> <span><strong className="text-swiss-black">الاتجاه:</strong> متعدد الأطراف دائري (Networked & Interactive)</span></li>
                      <li className="flex items-start gap-2"><span className="text-swiss-green font-bold">•</span> <span><strong className="text-swiss-black">الدور:</strong> المتابع يتحول إلى صانع محتوى (Prosumer)</span></li>
                      <li className="flex items-start gap-2"><span className="text-swiss-green font-bold">•</span> <span><strong className="text-swiss-black">المرونة:</strong> المحتوى حي وقابل للتعديل والتحديث اللحظي</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-swiss-green font-bold text-lg uppercase tracking-wider mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  المحور الثاني: الخصائص الجوهرية للوسائط الرقمية
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-swiss-gray border-t-4 border-swiss-yellow p-4">
                    <h4 className="text-swiss-yellow font-bold text-sm uppercase tracking-wider mb-2">الوسائط المتعددة</h4>
                    <p className="text-swiss-gray-lighter text-sm">Multimedia Integration - المحتوى الناجح يدمج النص والصوت والصور والفيديو التفاعلي لتعزيز الفكرة.</p>
                  </div>
                  <div className="bg-swiss-gray border-t-4 border-swiss-blue p-4">
                    <h4 className="text-swiss-blue font-bold text-sm uppercase tracking-wider mb-2">التشعب والترابط</h4>
                    <p className="text-swiss-gray-lighter text-sm">Hypertextuality - تنقل القارئ بين النصوص والمراجع فورًا عبر الروابط المباشرة دون الانفصال.</p>
                  </div>
                  <div className="bg-swiss-gray border-t-4 border-swiss-pink p-4">
                    <h4 className="text-swiss-pink font-bold text-sm uppercase tracking-wider mb-2">التحليل المبني على البيانات</h4>
                    <p className="text-swiss-gray-lighter text-sm">Data-Driven Content - كل كلمة تتأثر بالبيانات (نسبة المشاهدة، Retention Rate، التفاعلات).</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-swiss-blue font-bold text-lg uppercase tracking-wider mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  المحور الثالث: نموذج الاتصال الجديد
                </h3>
                <div className="bg-swiss-gray border-2 border-swiss-border p-5">
                  <div className="text-center font-mono text-sm text-swiss-black bg-white p-4 border-2 border-swiss-border">
                    <p className="mb-2">[صانع المحتوى / المنصة] ────(رسالة وسائط متعددة)────► [المستقبل / الجمهور]</p>
                    <p className="text-swiss-gray-lighter">▲ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; │</p>
                    <p className="text-swiss-gray-lighter">│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; │</p>
                    <p className="text-swiss-yellow font-bold">└─────────────(تفاعل / رجع صدى لحظي Feedback)─────────┘</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-swiss-pink font-bold text-lg uppercase tracking-wider mb-4 flex items-center gap-2">
                  ✏️ التطبيق العلمي (تمرين السكشن)
                </h3>
                <div className="bg-swiss-gray border-r-4 border-swiss-pink p-5">
                  <p className="text-swiss-black text-sm mb-4">تخيل أن هناك حدثًا هامًا (مثل إطلاق منتج جديد أو افتتاح معرض تقني):</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border-2 border-swiss-border p-4">
                      <h4 className="text-swiss-pink font-bold text-sm uppercase tracking-wider mb-2">صياغة خبر تقليدي</h4>
                      <p className="text-swiss-gray-lighter text-sm">اكتب جملة واحدة لكيفية تغطية هذا الحدث في مانشيت صحيفة ورقية.</p>
                    </div>
                    <div className="bg-white border-2 border-swiss-border p-4">
                      <h4 className="text-swiss-green font-bold text-sm uppercase tracking-wider mb-2">صياغة خبر رقمي</h4>
                      <p className="text-swiss-gray-lighter text-sm">اكتب منشورًا قصيرًا على X أو Instagram مع العوامل الرقمية (فيديو، رابط، هاشتاج، استطلاع رأي).</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedLecture.attachments && selectedLecture.attachments.length > 0 && (
                <div>
                  <h3 className="text-swiss-green font-bold text-lg uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Paperclip className="w-5 h-5" />
                    الملفات المرفقة ({selectedLecture.attachments.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedLecture.attachments.map((att) => (
                      <div
                        key={att.name}
                        className="flex items-center gap-3 p-4 bg-swiss-gray border-2 border-swiss-border hover:border-swiss-yellow transition-colors group cursor-pointer"
                        onClick={() => setViewingFile({ name: att.name, url: getFileUrl(selectedLecture.id, att.name) })}
                      >
                        <div className={cn(
                          "w-12 h-12 flex items-center justify-center flex-shrink-0",
                          att.type === "pdf" ? "bg-swiss-pink" : att.type === "audio" ? "bg-swiss-green" : "bg-swiss-blue"
                        )}>
                          {att.type === "pdf" ? <FileText className="w-6 h-6 text-swiss-black" /> : att.type === "audio" ? <Music className="w-6 h-6 text-swiss-black" /> : <Image className="w-6 h-6 text-swiss-black" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-swiss-black text-sm font-bold uppercase tracking-wider truncate">{att.name}</p>
                          <p className="text-swiss-gray-lighter text-xs">{att.size} — {att.description}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 text-swiss-gray-lighter hover:text-swiss-yellow" onClick={(e) => { e.stopPropagation(); setViewingFile({ name: att.name, url: getFileUrl(selectedLecture.id, att.name) }); }}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <a href={getFileUrl(selectedLecture.id, att.name)} download={att.name} onClick={e => e.stopPropagation()}>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 text-swiss-gray-lighter hover:text-swiss-green">
                            <Download className="w-4 h-4" />
                          </Button>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedLecture.terminology && selectedLecture.terminology.length > 0 && (
                <div>
                  <h3 className="text-swiss-pink font-bold text-lg uppercase tracking-wider mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    المصطلحات العلمية ({selectedLecture.terminology.length})
                  </h3>
                  <div className="space-y-4">
                    {selectedLecture.terminology.map((term, i) => {
                      const colors = ["border-swiss-yellow", "border-swiss-green", "border-swiss-blue", "border-swiss-pink", "border-swiss-yellow"];
                      const bgColors = ["bg-swiss-yellow", "bg-swiss-green", "bg-swiss-blue", "bg-swiss-pink", "bg-swiss-yellow"];
                      return (
                        <div key={i} className={cn("bg-swiss-gray border-r-4 p-5", colors[i % colors.length])}>
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div>
                              <h4 className="text-swiss-black font-bold text-lg uppercase tracking-wider">{term.termAr}</h4>
                              <p className={cn("text-sm font-bold", bgColors[i % bgColors.length], "text-swiss-black inline-block px-2 py-0.5 mt-1")}>{term.termEn} — {term.pronunciation}</p>
                            </div>
                          </div>
                          <div className="space-y-3 mt-4">
                            <div className="bg-white/50 p-3 border-l-2 border-swiss-yellow">
                              <p className="text-swiss-yellow text-xs font-bold uppercase tracking-widest mb-1">التعريف الأكاديمي</p>
                              <p className="text-swiss-black text-sm">{term.definition}</p>
                            </div>
                            <div className="bg-white/50 p-3 border-l-2 border-swiss-green">
                              <p className="text-swiss-green text-xs font-bold uppercase tracking-widest mb-1">الشرح المعمق</p>
                              <p className="text-swiss-gray-lighter text-sm leading-relaxed">{term.explanation}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="bg-white/50 p-3 border-l-2 border-swiss-blue">
                                <p className="text-swiss-blue text-xs font-bold uppercase tracking-widest mb-1">أمثلة تطبيقية</p>
                                <p className="text-swiss-gray-lighter text-sm">{term.examples}</p>
                              </div>
                              <div className="bg-white/50 p-3 border-l-2 border-swiss-pink">
                                <p className="text-swiss-pink text-xs font-bold uppercase tracking-widest mb-1">الخصائص الجوهرية</p>
                                <p className="text-swiss-gray-lighter text-sm">{term.characteristics}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between animate-fade-in-down">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-swiss-yellow flex items-center justify-center shadow-swiss-lg animate-float">
              <FileText className="w-8 h-8 text-swiss-black" />
            </div>
            <div>
              <h1 className="text-swiss-black font-bold text-4xl uppercase tracking-wider">المحاضرات</h1>
              <p className="text-swiss-gray-lighter text-sm uppercase tracking-widest mt-1">
                إدارة ورفع المحاضرات والمراجع
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-swiss-green text-swiss-black swiss-badge px-4 py-2 text-base">
              {lectures.length} محاضرة
            </Badge>
            <Button
              onClick={() => setFormOpen(!formOpen)}
              className="bg-swiss-yellow hover:bg-swiss-yellow/90 text-swiss-black font-bold px-6 uppercase tracking-wider swiss-button"
            >
              {formOpen ? (
                <>
                  <X className="w-4 h-4 ml-2" />
                  إخفاء
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 ml-2" />
                  رفع محاضرة
                </>
              )}
            </Button>
          </div>
        </div>

        {formOpen && (
          <Card className="bg-swiss-gray border-4 border-swiss-yellow">
            <CardHeader className="pb-4 border-b-2 border-swiss-border">
              <CardTitle className="text-swiss-black flex items-center gap-2 uppercase tracking-wider font-bold">
                <Upload className="w-5 h-5 text-swiss-yellow" />
                رفع محاضرة جديدة
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-swiss-yellow uppercase tracking-widest">
                      المقرر <span className="text-swiss-pink">*</span>
                    </label>
                    <select
                      value={form.course}
                      onChange={(e) => setForm((p) => ({ ...p, course: e.target.value }))}
                      className={cn(
                        "w-full h-11 px-4 bg-white border-2 border-swiss-border",
                        "text-swiss-black font-bold uppercase tracking-wider cursor-pointer transition-all",
                        "focus:border-swiss-yellow focus:outline-none",
                        !form.course && "text-swiss-gray-lighter"
                      )}
                    >
                      <option value="">اختر المقرر</option>
                      {LEVEL_1_COURSES.map((c) => (
                        <option key={c.code} value={c.name}>
                          {c.code} - {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-swiss-green uppercase tracking-widest">
                      المحاضر
                    </label>
                    <Input
                      type="text"
                      placeholder="مثال: د. أحمد الشريف"
                      value={form.instructor}
                      onChange={(e) => setForm((p) => ({ ...p, instructor: e.target.value }))}
                      className="h-11 bg-white border-2 border-swiss-border text-swiss-black placeholder:text-swiss-gray-lighter focus:border-swiss-green font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-swiss-blue uppercase tracking-widest">
                      رقم المحاضرة <span className="text-swiss-pink">*</span>
                    </label>
                    <Input
                      type="number"
                      min="1"
                      placeholder="مثال: 1"
                      value={form.number}
                      onChange={(e) => setForm((p) => ({ ...p, number: e.target.value }))}
                      className="h-11 bg-white border-2 border-swiss-border text-swiss-black placeholder:text-swiss-gray-lighter focus:border-swiss-blue font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-swiss-pink uppercase tracking-widest">
                      عنوان المحاضرة <span className="text-swiss-yellow">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="مثال: مقدمة في الإعلام الرقمي"
                      value={form.title}
                      onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                      className="h-11 bg-white border-2 border-swiss-border text-swiss-black placeholder:text-swiss-gray-lighter focus:border-swiss-pink font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-swiss-yellow uppercase tracking-widest">
                      التاريخ
                    </label>
                    <Input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                      className="h-11 bg-white border-2 border-swiss-border text-swiss-black focus:border-swiss-yellow font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-swiss-green uppercase tracking-widest">
                      رابط التسجيل
                    </label>
                    <Input
                      type="url"
                      placeholder="https://..."
                      value={form.recordingLink}
                      onChange={(e) => setForm((p) => ({ ...p, recordingLink: e.target.value }))}
                      className="h-11 bg-white border-2 border-swiss-border text-swiss-black placeholder:text-swiss-gray-lighter focus:border-swiss-green font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-swiss-blue uppercase tracking-widest">
                    ملاحظات
                  </label>
                  <Textarea
                    placeholder="ملاحظات إضافية عن المحاضرة"
                    value={form.notes}
                    onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                    rows={2}
                    className="bg-white border-2 border-swiss-border text-swiss-black placeholder:text-swiss-gray-lighter focus:border-swiss-blue font-bold resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-swiss-pink uppercase tracking-widest">
                    الملفات المرفقة
                  </label>
                  <div
                    {...getRootProps()}
                    className={cn(
                      "border-4 border-dashed p-8 text-center cursor-pointer transition-all",
                      "hover:border-swiss-yellow hover:bg-swiss-yellow/5",
                      isDragActive
                        ? "border-swiss-yellow bg-swiss-yellow/10"
                        : "border-swiss-border"
                    )}
                  >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className={cn(
                          "w-16 h-16 flex items-center justify-center transition-all",
                          isDragActive
                            ? "bg-swiss-yellow text-swiss-black"
                            : "bg-swiss-gray text-swiss-gray-lighter"
                        )}
                      >
                        {isExtracting ? (
                          <div className="w-8 h-8 border-4 border-swiss-border border-t-swiss-yellow rounded-full animate-spin" />
                        ) : (
                          <Upload className="w-8 h-8" />
                        )}
                      </div>
                      <div>
                        <p className="text-swiss-black font-bold text-lg uppercase tracking-wider">
                          {isExtracting
                            ? "جاري استخراج البيانات..."
                            : isDragActive
                            ? "أفلت الملفات هنا"
                            : "اسحب الملفات هنا أو انقر للاختيار"}
                        </p>
                        <p className="text-swiss-gray-lighter text-sm mt-1 uppercase tracking-widest">
                          PDF, PPT, PPTX, DOC, DOCX, صور, فيديو, صوت
                        </p>
                        <p className="text-swiss-yellow text-xs mt-2 flex items-center justify-center gap-1 font-bold uppercase tracking-widest">
                          <Sparkles className="w-3 h-3" />
                          البيانات تُستخرج تلقائياً
                        </p>
                      </div>
                    </div>
                  </div>
                  {extractedFrom && (
                    <p className="text-xs text-swiss-yellow flex items-center gap-1 font-bold uppercase tracking-widest">
                      <Sparkles className="w-3 h-3" />
                      تم استخراج البيانات من: {extractedFrom}
                    </p>
                  )}
                </div>

                {droppedFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-swiss-green uppercase tracking-widest">
                      الملفات المحددة ({droppedFiles.length})
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {droppedFiles.map((file, index) => (
                        <div
                          key={`${file.name}-${index}`}
                          className="flex items-center gap-3 p-3 bg-white border-2 border-swiss-border group"
                        >
                          <div className="w-8 h-8 bg-swiss-blue flex items-center justify-center flex-shrink-0">
                            {getFileIcon(file.name)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-swiss-black text-sm font-bold truncate uppercase tracking-wider">{file.name}</p>
                            <p className="text-swiss-gray-lighter text-xs">{formatFileSize(file.size)}</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(index);
                            }}
                            className="opacity-0 group-hover:opacity-100 w-7 h-7 bg-swiss-pink flex items-center justify-center transition-all"
                          >
                            <X className="w-3.5 h-3.5 text-swiss-black" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isUploading}
                    className="bg-swiss-green hover:bg-swiss-green/90 text-swiss-black font-bold px-8 h-11 text-base uppercase tracking-wider swiss-button"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-swiss-black/30 border-t-swiss-black rounded-full animate-spin ml-2" />
                        جاري الرفع...
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 ml-2" />
                        رفع المحاضرة
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-swiss-gray-lighter" />
            <Input
              type="text"
              placeholder="بحث في المحاضرات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pr-12 bg-swiss-gray border-2 border-swiss-border text-swiss-black placeholder:text-swiss-gray-lighter focus:border-swiss-yellow font-bold text-base"
            />
          </div>
          <div className="relative w-full sm:w-64">
            <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-swiss-gray-lighter pointer-events-none" />
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className={cn(
                "w-full h-12 px-4 pr-12 bg-swiss-gray border-2 border-swiss-border",
                "text-swiss-black font-bold uppercase tracking-wider cursor-pointer transition-all",
                "focus:border-swiss-yellow focus:outline-none",
                !filterCourse && "text-swiss-gray-lighter"
              )}
            >
              <option value="">جميع المقررات</option>
              {LEVEL_1_COURSES.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.code} - {c.name}
                </option>
              ))}
              {courseNames
                .filter((name) => !LEVEL_1_COURSES.some((c) => c.name === name))
                .map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
            </select>
            <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-swiss-gray-lighter pointer-events-none" />
          </div>
        </div>

        <div className="space-y-5">
          {filteredLectures.length === 0 ? (
            <Card className="bg-swiss-gray border-4 border-swiss-border">
              <CardContent className="py-16 text-center">
                <div className="w-16 h-16 bg-swiss-border mx-auto flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-swiss-gray-lighter" />
                </div>
                <p className="text-swiss-gray-lighter text-lg font-bold uppercase tracking-wider">لا توجد محاضرات بعد</p>
                <p className="text-swiss-gray-lighter/60 text-sm mt-1 uppercase tracking-widest">
                  ابدأ برفع محاضرتك الأولى
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredLectures.map((lecture, index) => {
              const borderColors = ["border-swiss-yellow", "border-swiss-green", "border-swiss-blue", "border-swiss-pink"];
              const badgeColors = ["bg-swiss-yellow text-swiss-black", "bg-swiss-green text-swiss-black", "bg-swiss-blue text-swiss-black", "bg-swiss-pink text-swiss-black"];
              return (
                <Card
                  key={lecture.id}
                  className={cn("bg-swiss-gray border-4 transition-colors hover:bg-swiss-surface-light", borderColors[index % borderColors.length])}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className={cn("w-14 h-14 flex items-center justify-center flex-shrink-0", badgeColors[index % badgeColors.length])}>
                          <span className="font-bold text-2xl">
                            {lecture.number}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-swiss-black font-bold text-lg uppercase tracking-wider truncate">
                              {lecture.title}
                            </h3>
                            <Badge className={cn("swiss-badge", badgeColors[index % badgeColors.length])}>
                              {lecture.course}
                            </Badge>
                            {lecture.instructor && (
                              <Badge className="bg-swiss-gray border border-swiss-border text-swiss-gray-lighter swiss-badge">
                                {lecture.instructor}
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-4 text-sm text-swiss-gray-lighter">
                            <span className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-xs">
                              <Calendar className="w-3.5 h-3.5" />
                              {new Date(lecture.date).toLocaleDateString("ar-EG", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                            {lecture.files.length > 0 && (
                              <span className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-xs">
                                <Paperclip className="w-3.5 h-3.5" />
                                {lecture.files.length} مرفق
                              </span>
                            )}
                            {lecture.terminology && lecture.terminology.length > 0 && (
                              <span className="flex items-center gap-1.5 text-swiss-yellow font-bold uppercase tracking-widest text-xs">
                                <BookOpen className="w-3.5 h-3.5" />
                                {lecture.terminology.length} مصطلح
                              </span>
                            )}
                          </div>

                          {lecture.notes && (
                            <p className="text-swiss-gray-lighter text-sm line-clamp-2 leading-relaxed">
                              {lecture.notes}
                            </p>
                          )}

                          {lecture.files.length > 0 && (
                            <div className="flex items-center gap-2 flex-wrap">
                          {lecture.files.slice(0, 4).map((file) => (
                                <span
                                  key={file}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-swiss-gray text-swiss-gray-lighter text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-swiss-yellow hover:text-swiss-black transition-colors"
                                  onClick={() => setViewingFile({ name: file, url: getFileUrl(lecture.id, file) })}
                                >
                                  {getFileIcon(file)}
                                  {file.length > 20 ? file.substring(0, 17) + "..." : file}
                                </span>
                              ))}
                              {lecture.files.length > 4 && (
                                <span className="text-swiss-gray-lighter text-xs font-bold">+{lecture.files.length - 4} أخرى</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedLecture(lecture)}
                          className="text-swiss-gray-lighter hover:text-swiss-yellow hover:bg-swiss-yellow/10"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-swiss-gray-lighter hover:text-swiss-green hover:bg-swiss-green/10"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(lecture.id)}
                          className="text-swiss-gray-lighter hover:text-swiss-pink hover:bg-swiss-pink/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>

      {viewingFile && (
        <FileViewer
          fileName={viewingFile.name}
          fileUrl={viewingFile.url}
          fileType={getFileType(viewingFile.name)}
          onClose={() => setViewingFile(null)}
        />
      )}
    </div>
  );
}
