import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react';
import './Home.css';
import { useEffect, useState } from 'react';
import UserService from '../sevices/UserService';
import UserList from '../components/UserList/UserList';

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

  const removeUser = (id: string) => {
    const newUsers = users.filter((user) => user.login.uuid !== id)
    setUsers(newUsers);
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>100 Random Users</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* <IonContent fullscreen>
          {
            users.map((user, index) => (
            <IonItemSliding key={user.login.uuid}>
                <IonItem>
                  <IonLabel>{user.email}</IonLabel>
                </IonItem>
              <IonItemOptions>
                <IonItemOption color="danger" onClick={() => removeUser(user.login.uuid)}>Remove</IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
            ))
          }
          <IonInfiniteScroll
            onIonInfinite={(ev) => {
              fetchUsers(),
              setTimeout(() => ev.target.complete(), 500);
            }}
          >
            <IonInfiniteScrollContent></IonInfiniteScrollContent>
          </IonInfiniteScroll>
      </IonContent> */}
      <UserList users={users} setUsers={setUsers}>
        <IonInfiniteScroll
              onIonInfinite={(ev) => {
                fetchUsers(),
                setTimeout(() => ev.target.complete(), 500);
              }}
            >
              <IonInfiniteScrollContent></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </UserList>
    </IonPage>
  );
};

export default Home;
