import type { createResource } from "./createResource";
import type { User } from "./User";

export interface IProfilesProps {
  resource: ReturnType<typeof createResource>;
}

export const Profiles: React.FC<IProfilesProps> = ({ resource }) => {
  const users = resource.read() as User[];

  return (
    <ul>
      {users.map((user, index) => {
        return (
          <li key={`${user.name}-${index}`}>
            <p>User name: {user.name}</p>
            <p>User email: {user.email}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Profiles;
