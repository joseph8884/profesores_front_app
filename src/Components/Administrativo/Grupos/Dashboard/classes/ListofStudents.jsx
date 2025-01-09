import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../ui/table";
import { Checkbox } from "../../../../ui/checkbox";
const ListofStudents = ({ students, attendance, setAttendance }) => {
  const handleAttendanceCheckbox = (studentId) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [studentId]: !prevAttendance[studentId],
    }));
  };
  return (
    <div className="student-attendance">
      <label className="mb-2 font-semibold">Mark Attendance:</label>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Asistencia</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.id}</TableCell>
              <TableCell className="font-medium">{student.fullName}</TableCell>
              <TableCell>
                <Checkbox
                  checked={attendance[student.id]}
                  onCheckedChange={() => handleAttendanceCheckbox(student.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListofStudents;
