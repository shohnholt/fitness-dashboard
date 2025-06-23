'use client';
import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

// Inside your component, add these functions:

// Load workouts on startup
useEffect(() => {
  const loadWorkouts = async () => {
    const q = query(collection(db, 'workouts'), orderBy('date'));
    const querySnapshot = await getDocs(q);
    const loadedWorkouts = [];
    querySnapshot.forEach((doc) => {
      loadedWorkouts.push({ id: doc.id, ...doc.data() });
    });
    setWorkouts(loadedWorkouts);
  };
  
  const loadMetrics = async () => {
    const q = query(collection(db, 'metrics'), orderBy('date'));
    const querySnapshot = await getDocs(q);
    const loadedMetrics = [];
    querySnapshot.forEach((doc) => {
      loadedMetrics.push({ id: doc.id, ...doc.data() });
    });
    setMetrics(loadedMetrics);
  };

  loadWorkouts();
  loadMetrics();
}, []);

// Update your addWorkout function:
const addWorkout = async () => {
  if (!workoutForm.exercise || !workoutForm.sets || !workoutForm.reps) return;
  
  const newWorkout = {
    date: selectedDate.toISOString().split('T')[0],
    ...workoutForm
  };
  
  if (editingWorkout) {
    await updateDoc(doc(db, 'workouts', editingWorkout.id), newWorkout);
    setWorkouts(workouts.map(w => w.id === editingWorkout.id ? {...newWorkout, id: editingWorkout.id} : w));
    setEditingWorkout(null);
  } else {
    const docRef = await addDoc(collection(db, 'workouts'), newWorkout);
    setWorkouts([...workouts, { ...newWorkout, id: docRef.id }]);
  }
  
  setWorkoutForm({ exercise: '', sets: '', reps: '', weight: '' });
  setShowWorkoutModal(false);
};

// Update deleteWorkout:
const deleteWorkout = async (id) => {
  await deleteDoc(doc(db, 'workouts', id));
  setWorkouts(workouts.filter(w => w.id !== id));
};

// Update addMetrics:
const addMetrics = async () => {
  if (!metricsForm.weight) return;
  
  const docRef = await addDoc(collection(db, 'metrics'), metricsForm);
  setMetrics([...metrics, { ...metricsForm, id: docRef.id }]);
  setShowMetricsModal(false);
  // ... rest of the function
};
