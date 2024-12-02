// Enums
enum StudentStatus {
    Active = "Active",
    Academic_Leave = "Academic_Leave",
    Graduated = "Graduated",
    Expelled = "Expelled",
}

enum CourseType {
    Mandatory = "Mandatory",
    Optional = "Optional",
    Special = "Special",
}

enum Semester {
    First = "First",
    Second = "Second",
}

enum GradeValue {
    Excellent = 5,
    Good = 4,
    Satisfactory = 3,
    Unsatisfactory = 2,
}

enum Faculty {
    Computer_Science = "Computer_Science",
    Economics = "Economics",
    Law = "Law",
    Engineering = "Engineering",
}

// Interfaces
interface Student {
    id: number;
    fullName: string;
    faculty: Faculty;
    year: number;
    status: StudentStatus;
    enrollmentDate: Date;
    groupNumber: string;
}

interface Course {
    id: number;
    name: string;
    type: CourseType;
    credits: number;
    semester: Semester;
    faculty: Faculty;
    maxStudents: number;
}

interface Grade {
    studentId: number;
    courseId: number;
    grade: GradeValue;
    date: Date;
    semester: Semester;
}

// UniversityManagementSystem class
class UniversityManagementSystem {
    private students: Student[] = [];
    private courses: Course[] = [];
    private grades: Grade[] = [];
    private nextStudentId: number = 1;
    private nextCourseId: number = 1;

    // Enroll a new student
    enrollStudent(student: Omit<Student, "id">): Student {
        const newStudent: Student = { ...student, id: this.nextStudentId++ };
        this.students.push(newStudent);
        return newStudent;
    }

    // Register student for a course
    registerForCourse(studentId: number, courseId: number): void {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);

        if (!student || !course) {
            throw new Error("Student or course not found.");
        }

        if (course.faculty !== student.faculty) {
            throw new Error("Student cannot register for a course in a different faculty.");
        }

        const enrolledStudents = this.grades.filter(g => g.courseId === courseId).length;
        if (enrolledStudents >= course.maxStudents) {
            throw new Error("Course is full.");
        }

        // Add empty grade to signify enrollment
        this.grades.push({
            studentId,
            courseId,
            grade: GradeValue.Unsatisfactory, // Placeholder until grade is set
            date: new Date(),
            semester: course.semester,
        });
    }

    // Set grade for a student
    setGrade(studentId: number, courseId: number, grade: GradeValue): void {
        const studentGrade = this.grades.find(g => g.studentId === studentId && g.courseId === courseId);

        if (!studentGrade) {
            throw new Error("Student is not registered for this course.");
        }

        studentGrade.grade = grade;
        studentGrade.date = new Date();
    }

    // Update student status
    updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
        const student = this.students.find(s => s.id === studentId);

        if (!student) {
            throw new Error("Student not found.");
        }

        if (newStatus === StudentStatus.Graduated && student.year < 4) {
            throw new Error("Student cannot graduate before completing 4 years.");
        }

        student.status = newStatus;
    }

    // Get students by faculty
    getStudentsByFaculty(faculty: Faculty): Student[] {
        return this.students.filter(student => student.faculty === faculty);
    }

    // Get all grades for a student
    getStudentGrades(studentId: number): Grade[] {
        return this.grades.filter(grade => grade.studentId === studentId);
    }

    // Get available courses for a faculty in a semester
    getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
        return this.courses.filter(course => course.faculty === faculty && course.semester === semester);
    }

    // Calculate average grade for a student
    calculateAverageGrade(studentId: number): number {
        const studentGrades = this.grades.filter(g => g.studentId === studentId);
        if (studentGrades.length === 0) return 0;

        const total = studentGrades.reduce((sum, grade) => sum + grade.grade, 0);
        return total / studentGrades.length;
    }

    // Get list of excellent students by faculty
    getExcellentStudentsByFaculty(faculty: Faculty): Student[] {
        const excellentStudentIds = this.grades
            .filter(grade => grade.grade === GradeValue.Excellent)
            .map(grade => grade.studentId);

        return this.students.filter(
            student => student.faculty === faculty && excellentStudentIds.includes(student.id)
        );
    }

    // Add a course (helper method)
    addCourse(course: Omit<Course, "id">): Course {
        const newCourse: Course = { ...course, id: this.nextCourseId++ };
        this.courses.push(newCourse);
        return newCourse;
    }
}

// Example usage
const university = new UniversityManagementSystem();

const student = university.enrollStudent({
    fullName: "John Doe",
    faculty: Faculty.Computer_Science,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "CS-101",
});

const course = university.addCourse({
    name: "Algorithms",
    type: CourseType.Mandatory,
    credits: 5,
    semester: Semester.First,
    faculty: Faculty.Computer_Science,
    maxStudents: 30,
});

university.registerForCourse(student.id, course.id);
university.setGrade(student.id, course.id, GradeValue.Excellent);
console.log(university.getStudentGrades(student.id));
console.log(university.calculateAverageGrade(student.id));
console.log(university.getExcellentStudentsByFaculty(Faculty.Computer_Science));
