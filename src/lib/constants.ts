export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  color: string;
  type: string;
}

export interface Instructor {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  department: string;
  email: string;
  courses: string[];
}

export interface ScheduleDay {
  day: string;
  items: {
    courseCode: string;
    courseName: string;
    time: string;
    type: string;
    instructor: string;
    room: string;
  }[];
}

export const LEVEL_1_COURSES: Course[] = [
  { id: "1", code: "DM101", name: "مدخل إلى الإعلام الرقمي والاتصال الجماهيري", credits: 3, color: "#3B82F6", type: "محاضرة" },
  { id: "2", code: "DM102", name: "أساسيات الكتابة للويب والمنصات", credits: 3, color: "#10B981", type: "محاضرة" },
  { id: "3", code: "DM103", name: "أصول التصميم البصري وإنتاج الجرافيك", credits: 3, color: "#8B5CF6", type: "محاضرة" },
  { id: "4", code: "DM104", name: "أخلاقيات وتشريعات الإعلام الرقمي", credits: 3, color: "#F59E0B", type: "محاضرة" },
];

export const INSTRUCTORS: Instructor[] = [
  { id: "1", firstName: "أحمد", lastName: "الشريف", title: "د.", department: "الإعلام الرقمي", email: "a.elsharif@ugi.edu", courses: ["DM101"] },
  { id: "2", firstName: "ريم", lastName: "خالد", title: "د.", department: "الكتابة الرقمية", email: "r.khaled@ugi.edu", courses: ["DM102"] },
  { id: "3", firstName: "طارق", lastName: "زياد", title: "د.", department: "التصميم البصري", email: "t.ziyad@ugi.edu", courses: ["DM103"] },
  { id: "4", firstName: "يوسف", lastName: "العلي", title: "د.", department: "التشريعات الإعلامية", email: "y.ali@ugi.edu", courses: ["DM104"] },
  { id: "5", firstName: "سارة", lastName: "محمود", title: "م.", department: "التطبيق العملي", email: "s.mahmoud@ugi.edu", courses: ["DM101"] },
  { id: "6", firstName: "كريم", lastName: "فؤاد", title: "أ.", department: "ورش العمل الرقمية", email: "k.fouad@ugi.edu", courses: ["DM102"] },
  { id: "7", firstName: "نورهان", lastName: "علي", title: "م.", department: "التصميم والجرافيك", email: "n.ali@ugi.edu", courses: ["DM103"] },
  { id: "8", firstName: "سلمى", lastName: "حسن", title: "أ.", department: "دراسات الحالة", email: "s.hassan@ugi.edu", courses: ["DM104"] },
];

export const WEEKLY_SCHEDULE: ScheduleDay[] = [
  { day: "الأحد", items: [
    { courseCode: "DM101", courseName: "مدخل إلى الإعلام الرقمي والاتصال الجماهيري", time: "10:00 - 11:30", type: "محاضرة", instructor: "د. أحمد الشريف", room: "قاعة 101" },
    { courseCode: "DM101", courseName: "مدخل إلى الإعلام الرقمي والاتصال الجماهيري", time: "12:00 - 13:30", type: "سكشن", instructor: "م. سارة محمود", room: "معمل 1" },
  ]},
  { day: "الاثنين", items: [
    { courseCode: "DM102", courseName: "أساسيات الكتابة للويب والمنصات", time: "10:00 - 11:30", type: "محاضرة", instructor: "د. ريم خالد", room: "قاعة 102" },
    { courseCode: "DM102", courseName: "أساسيات الكتابة للويب والمنصات", time: "12:00 - 13:30", type: "سكشن", instructor: "أ. كريم فؤاد", room: "ورشة 2" },
  ]},
  { day: "الثلاثاء", items: [
    { courseCode: "DM103", courseName: "أصول التصميم البصري وإنتاج الجرافيك", time: "10:00 - 11:30", type: "محاضرة", instructor: "د. طارق زياد", room: "قاعة 103" },
    { courseCode: "DM103", courseName: "أصول التصميم البصري وإنتاج الجرافيك", time: "12:00 - 13:30", type: "سكشن", instructor: "م. نورهان علي", room: "معمل تصميم" },
  ]},
  { day: "الأربعاء", items: [
    { courseCode: "DM104", courseName: "أخلاقيات وتشريعات الإعلام الرقمي", time: "10:00 - 11:30", type: "محاضرة", instructor: "د. يوسف العلي", room: "قاعة 104" },
    { courseCode: "DM104", courseName: "أخلاقيات وتشريعات الإعلام الرقمي", time: "12:00 - 13:30", type: "سكشن", instructor: "أ. سلمى حسن", room: "قاعة 205" },
  ]},
];

export const SEMESTER_COURSES = LEVEL_1_COURSES;

export const COURSE_NAMES: string[] = LEVEL_1_COURSES.map((c) => c.name);

export const COURSE_COLOR_MAP: Record<string, string> = Object.fromEntries(
  LEVEL_1_COURSES.map((c) => [c.code, c.color])
);

export const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "application/vnd.ms-powerpoint": [".ppt"],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/gif": [".gif"],
  "video/mp4": [".mp4"],
  "video/avi": [".avi"],
  "video/quicktime": [".mov"],
  "audio/mpeg": [".mp3"],
  "audio/wav": [".wav"],
  "audio/ogg": [".ogg"],
  "audio/mp4": [".m4a"],
};
