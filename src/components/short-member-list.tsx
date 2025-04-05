import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface MemberRowProps {
  avatarUrl: string;
  name: string;
  dateOfBirth: string;
}

const MemberRow = ({ avatarUrl, name, dateOfBirth }: MemberRowProps) => {
  return (
    <TableRow className="border-b hover:bg-gray-50">
      <TableCell>
        <Avatar className="mr-4">
          <AvatarImage src={avatarUrl} alt={`${name}'s avatar`} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell>
        <span className="font-medium">{name}</span>
      </TableCell>
      <TableCell>{dateOfBirth}</TableCell>
    </TableRow>
  );
};

export interface ShortMemberListProps {
  members: MemberRowProps[];
}

const ShortMemberList = ({ members }: ShortMemberListProps) => {
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

export default ShortMemberList;
