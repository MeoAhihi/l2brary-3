import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface ClassJoiningData {
    class: string;
    join_rate: number;
    quiz_rate: number;
}

interface ClassJoiningTableProps {
    data: ClassJoiningData[];
}

export function ClassJoiningTable({ data }: ClassJoiningTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Lớp học</TableHead>
                    <TableHead>Tỉ lệ tham gia</TableHead>
                    <TableHead>Tỉ lệ Bài tập</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row) => (
                    <TableRow key={row.class}>
                        <TableCell>{row.class}</TableCell>
                        <TableCell>{row.join_rate}%</TableCell>
                        <TableCell>{row.quiz_rate}%</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}