//Interface för att typsäkra objecthanteringen för kurser som hämtas i servicen getcourses

export interface Courses {
    courseCode: string;
    subjectCode: string;
    level: string;
    progression: string;
    courseName: string;
    points: number;
    institutionCode: string;
    subject: string;
    syllabus: string;
  }

