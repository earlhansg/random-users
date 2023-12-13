import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react';
import './Home.css';
import { useEffect, useState } from 'react';
import UserService from '../sevices/UserService';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>100 Random Users</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          {
            users.map((user, index) => (
            <IonItemSliding key={user.login.uuid}>
                <IonItem>
                  <IonLabel>{user.email}</IonLabel>
                </IonItem>
              <IonItemOptions>
                <IonItemOption color="danger">Remove</IonItemOption>
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
      </IonContent>
    </IonPage>
  );
};

export default Home;
