import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Base required properties
export interface BaseMemberProps {
  avatarUrl: string;
  name: string;
}

// Additional optional fields
export interface MemberRowProps extends BaseMemberProps {
  [key: string]: any; // Allow any additional fields
}

// Configuration for optional fields
export interface OptionalField {
  key: string;
  label: string;
  render?: (value: any) => React.ReactNode;
}

export interface MemberListProps extends React.HTMLAttributes<HTMLDivElement> {
  members: MemberRowProps[];
  optionalFields?: OptionalField[];
  showHeader?: boolean;
}

const MemberRow = ({ member, optionalFields = [] }: {
  member: MemberRowProps,
  optionalFields: OptionalField[]
}) => {
  return (
    <TableRow className="border-b">
      <TableCell>
        <Avatar className="mr-4">
          <AvatarImage src={member.avatarUrl} alt={`${member.name}'s avatar`} />
          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell>
        <span className="font-medium">{member.name}</span>
      </TableCell>
      {optionalFields.map((field) => (
        <TableCell key={field.key}>
          {field.render
            ? field.render(member[field.key])
            : member[field.key]}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default function MemberList({
  members,
  optionalFields = [],
  showHeader = true,
  ...props
}: MemberListProps) {
  return (
    <Table {...props}>
      {showHeader && (
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>Name</TableHead>
            {optionalFields.map((field) => (
              <TableHead key={field.key}>{field.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
      )}
      <TableBody>
        {members.map((member, index) => (
          <MemberRow
            key={index}
            member={member}
            optionalFields={optionalFields}
          />
        ))}
      </TableBody>
    </Table>
  );
};
