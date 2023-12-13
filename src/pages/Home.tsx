import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInfiniteScroll, IonInfiniteScrollContent, IonList } from '@ionic/react';
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
          <IonList>
            {users.map((item, index) => (
              <IonItem key={item.login.uuid}>
                <IonLabel>{item.email}</IonLabel>
              </IonItem>
            ))}
            {/* <IonItem>
                <IonLabel>Item1</IonLabel>
            </IonItem>
            <IonItem>
                <IonLabel>Item1</IonLabel>
            </IonItem> */}
          </IonList>
          <IonInfiniteScroll
            onIonInfinite={(ev) => {
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
