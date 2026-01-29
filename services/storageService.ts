import { UserProfile, QuizResult } from '../types';
import { db, auth } from './firebase';

// User Operations
export const saveUser = async (user: UserProfile): Promise<void> => {
  if (!user.id) return;
  // Use v8 namespaced syntax
  await db.collection('users').doc(user.id).set(user, { merge: true });
};

export const getUser = async (uid: string): Promise<UserProfile | null> => {
  const userRef = db.collection('users').doc(uid);
  const docSnap = await userRef.get();

  // In v8, .exists is a property, not a function
  if (docSnap.exists) {
    return docSnap.data() as UserProfile;
  } else {
    return null;
  }
};

export const logoutUser = async (): Promise<void> => {
  await auth.signOut();
};

// Quiz History Operations
export const saveQuizResult = async (userId: string, result: QuizResult): Promise<void> => {
  const historyRef = db.collection('users').doc(userId).collection('history');
  await historyRef.add(result);
};

export const getQuizHistory = async (userId: string, limit: number = 20): Promise<QuizResult[]> => {
  const historyRef = db.collection('users').doc(userId).collection('history');
  // Optimized query with server-side ordering and limiting
  const querySnapshot = await historyRef
    .orderBy('date', 'desc')
    .limit(limit)
    .get();

  const history: QuizResult[] = [];
  querySnapshot.forEach((doc) => {
    history.push(doc.data() as QuizResult);
  });

  return history;
};
