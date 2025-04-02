import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface MemberRowProps {
  avatarUrl: string;
  name: string;
  position: string;
}

const MemberRow = ({ avatarUrl, name, position }: MemberRowProps) => {
  return (
    <TableRow className="border-b">
      <TableCell>
        <Avatar className="mr-4">
          <AvatarImage src={avatarUrl} alt={`${name}'s avatar`} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell>
        <span className="font-medium">{name}</span>
      </TableCell>
      <TableCell>{position}</TableCell>
    </TableRow>
  );
};

export default function ClassMemberPostionList({ members }: { members: MemberRowProps[] }) {
  return (
    <Table>
      <TableBody>
        {members.map((member, index) => (
          <MemberRow key={index} {...member} />
        ))}
      </TableBody>
    </Table>
  );
};

