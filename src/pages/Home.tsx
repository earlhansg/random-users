import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonLoading,
} from "@ionic/react";
import "./Home.css";
import { useEffect, useState } from "react";
import UserService from "../sevices/UserService";
import UserList from "../components/UserList/UserList";

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data: { results: User[] } = await UserService.fetchUsers();
      setUsers(data.results);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>100 Random Users</IonTitle>
        </IonToolbar>
      </IonHeader>
      {!loading ? (
        <UserList users={users} setUsers={setUsers}>
          <IonInfiniteScroll
            onIonInfinite={(ev) => {
              fetchUsers(), setTimeout(() => ev.target.complete(), 500);
            }}
          >
            <IonInfiniteScrollContent></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </UserList>
      ) : (
        <IonLoading message="Fetching users..." isOpen={true} />
      )}
    </IonPage>
  );
};

export default Home;
