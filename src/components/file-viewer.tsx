"use client";

import { useState } from "react";
import { X, Download, ZoomIn, ZoomOut, RotateCw, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileViewerProps {
  fileName: string;
  fileUrl: string;
  fileType: "pdf" | "image" | "audio" | "unknown";
  onClose: () => void;
}

export function FileViewer({ fileName, fileUrl, fileType, onClose }: FileViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 20, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 20, 50));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex flex-col">
      <div className="bg-white border-b-4 border-swiss-yellow px-4 py-3 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-8 h-8 flex items-center justify-center",
            fileType === "pdf" ? "bg-swiss-pink" : fileType === "image" ? "bg-swiss-blue" : "bg-swiss-green"
          )}>
            <span className="text-swiss-black text-xs font-bold uppercase">
              {fileType === "pdf" ? "PDF" : fileType === "image" ? "IMG" : "AUD"}
            </span>
          </div>
          <div>
            <h3 className="text-swiss-black font-bold text-sm uppercase tracking-wider truncate max-w-md">{fileName}</h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {(fileType === "pdf" || fileType === "image") && (
            <>
              <Button variant="ghost" size="sm" onClick={handleZoomOut} className="text-swiss-gray-lighter hover:text-swiss-black">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-swiss-black text-xs font-bold min-w-[3rem] text-center">{zoom}%</span>
              <Button variant="ghost" size="sm" onClick={handleZoomIn} className="text-swiss-gray-lighter hover:text-swiss-black">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleRotate} className="text-swiss-gray-lighter hover:text-swiss-black">
                <RotateCw className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-swiss-border mx-1" />
            </>
          )}
          <a href={fileUrl} download={fileName}>
            <Button variant="ghost" size="sm" className="text-swiss-gray-lighter hover:text-swiss-green">
              <Download className="w-4 h-4 ml-1" />
              تحميل
            </Button>
          </a>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-swiss-gray-lighter hover:text-swiss-pink">
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto flex items-center justify-center p-4" onClick={onClose}>
        {fileType === "pdf" && (
          <iframe
            src={`${fileUrl}#toolbar=0`}
            className="w-full h-full bg-white shadow-xl"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: "center center",
              transition: "transform 0.2s ease",
              minHeight: "80vh",
            }}
            title={fileName}
          />
        )}

        {fileType === "image" && (
          <div className="bg-white p-4 shadow-xl max-w-full max-h-full overflow-auto" onClick={e => e.stopPropagation()}>
            <img
              src={fileUrl}
              alt={fileName}
              className="max-w-full max-h-[80vh] object-contain select-none"
              style={{
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                transformOrigin: "center center",
                transition: "transform 0.2s ease",
              }}
              draggable={false}
            />
          </div>
        )}

        {fileType === "audio" && (
          <div className="bg-white p-8 shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-swiss-green mx-auto flex items-center justify-center mb-4">
                <Volume2 className="w-10 h-10 text-swiss-black" />
              </div>
              <h3 className="text-swiss-black font-bold text-lg uppercase tracking-wider">{fileName}</h3>
            </div>
            <audio controls className="w-full">
              <source src={fileUrl} />
              المتصفح لا يدعم تشغيل الصوت
            </audio>
          </div>
        )}

        {fileType === "unknown" && (
          <div className="bg-white p-8 shadow-xl text-center" onClick={e => e.stopPropagation()}>
            <p className="text-swiss-gray-lighter font-bold uppercase tracking-wider">لا يمكن عرض هذا الملف</p>
            <a href={fileUrl} download={fileName}>
              <Button className="mt-4 bg-swiss-yellow text-swiss-black font-bold uppercase tracking-wider">
                <Download className="w-4 h-4 ml-2" />
                تحميل الملف
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export function getFileType(filename: string): "pdf" | "image" | "audio" | "unknown" {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  if (["pdf"].includes(ext)) return "pdf";
  if (["png", "jpg", "jpeg", "gif", "svg", "webp"].includes(ext)) return "image";
  if (["mp3", "wav", "ogg", "m4a", "mp4"].includes(ext)) return "audio";
  return "unknown";
}

export function getFileUrl(lectureId: number, filename: string): string {
  return `/lectures/${lectureId}/${encodeURIComponent(filename)}`;
}
