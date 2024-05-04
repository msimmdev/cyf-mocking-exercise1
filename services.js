import { getStudents } from "./data.js";

function countStudents() {
  let students;
  try {
    students = getStudents();
  } catch {
    return null;
  }
  return students.length;
}

function getFirstStudent() {
  const students = getStudents();
  return students[0];
}

export { countStudents, getFirstStudent };
