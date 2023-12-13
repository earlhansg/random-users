import {
  IonContent,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
} from "@ionic/react";
import React from "react";

interface UserListProps {
  users: User[];
  setUsers: (newUsers: User[]) => void;
  children?: React.ReactNode;
}

const UserList: React.FC<UserListProps> = ({
  users,
  setUsers,
  children,
}: UserListProps) => {
  const removeUser = (id: string) => {
    const newUsers = users.filter((user) => user.login.uuid !== id);
    setUsers(newUsers);
  };
  return (
    <>
      <IonContent fullscreen>
        {users.map((user, index) => (
          <IonItemSliding key={user.login.uuid}>
            <IonItem>
              <IonLabel>
                {user.name.first} {user.name.last}
              </IonLabel>
            </IonItem>
            <IonItemOptions>
              <IonItemOption
                color="danger"
                onClick={() => removeUser(user.login.uuid)}
              >
                Remove
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        ))}
        {children}
      </IonContent>
    </>
  );
};

export default UserList;
