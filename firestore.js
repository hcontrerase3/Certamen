import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
//funciones de firestore
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, query, updateDoc, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// TODO: Documentación
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyCNl0_VDG33SVu3vCZ3wbj8qF7BO7VjS4g",
    authDomain: "certamen-bedc9.firebaseapp.com",
    projectId: "certamen-bedc9",
    storageBucket: "certamen-bedc9.appspot.com",
    messagingSenderId: "889472550506",
    appId: "1:889472550506:web:53db716e5230cad5312c13",
    measurementId: "G-D17YC5TWSJ"
  };
  
  

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Guardar un documento
export const save = async (emp) => {
    await addDoc(collection(db, 'GestionFarma'), emp);
};

// Obtener todos los documentos en tiempo real
export const getAll = (data) => {
    onSnapshot(collection(db, 'GestionFarma'), data);
};

// Eliminar un documento
export const remove = async (id) => {
    await deleteDoc(doc(db, 'GestionFarma', id));
};

// Seleccionar un documento
export const selectOne = async (id) => await getDoc(doc(db, 'GestionFarma', id));

// Actualizar un documento
export const update = async (id, emp) => {
    await updateDoc(doc(db, 'GestionFarma', id), emp);
};

// Verificar si un código ya existe
export const Duplicidad = async (codigo) => {
    const q = query(collection(db, 'GestionFarma'), where("codigo", "==", codigo));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
};





