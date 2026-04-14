import { toggleLoader } from "../UI/loader.js";
import { clampGpa } from "./util.js";

const MAJORS = [
  "Computer Science",
  "Software Engineering",
  "Information Systems",
  "Cybersecurity",
  "Data Science",
];

export class Student {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || "";
    this.email = data.email || "";
    this.major = data.major || "";
    this.gpa = data.gpa || 0;
  }

  static async getStudents(API_ENDPOINT) {
    try {
      toggleLoader(true);
      const res = await fetch(API_ENDPOINT);

      if (!res.ok)
        throw new Error("we catch response error !");

      let text = await res.text();
      if (text) {
        let arr = JSON.parse(text);
        let data = arr.map(
          (s) =>
            new Student({
              id: s.id,
              name: s.name,
              email: s.email,
              major: MAJORS[s.id % MAJORS.length],
              gpa: clampGpa(2.6 + (s.id % 15) * 0.1),
            }));

        localStorage.setItem('students', JSON.stringify(data));
        return {
          data: data,
          result: {
            success: true,
            error: ""
          }
        };
      }
    } catch (error) {
      return {
        data: [],
        result: {
          success: false,
          error: error.message
        }
      }
    } finally {
      toggleLoader(false);
    }
  }
}
