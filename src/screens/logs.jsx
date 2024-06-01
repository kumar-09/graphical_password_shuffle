import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config'; // Adjust the path as needed
import './logs.css'; // Import the CSS file

const CelebGraphicalPassword = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocument = async (name) =>{
      try{
        const dict={'report':[],'attempt':null}
        const attemptsCollectionRef = collection(db, "celeb_grphical_password_shuffle", name, "attempts");
        const attemptsSnapshot = await getDocs(attemptsCollectionRef);
        for(let i = 0 ; i<3 ; i++){
          const indentedDict={}
          if(attemptsSnapshot._snapshot.docChanges.length === 0 || attemptsSnapshot._snapshot.docChanges.length <= i ){
            indentedDict["status"]= "-"
            indentedDict["recalled"]="-"
            indentedDict["time_taken"]="-"
          }else{
            const recallData =attemptsSnapshot._snapshot.docChanges[i].doc.data.value.mapValue.fields
            if (!recallData.status.booleanValue){
              indentedDict["status"]=recallData.status.booleanValue
              indentedDict["recalled"]=recallData.recall.arrayValue.values.length-recallData.incorrect.arrayValue.values.length
              indentedDict["time_taken"]=recallData.time_taken.integerValue
            }else{
              indentedDict["status"]=recallData.status.booleanValue
              indentedDict["recalled"]=recallData.recall.arrayValue.values.length
              indentedDict["time_taken"]=recallData.time_taken.integerValue
            }
          }
          dict.report.push(indentedDict)
        }
        if(attemptsSnapshot._snapshot.docChanges.length === 0){ 
          dict.attempt="-"
        }else{
          for(let i = 0 ; i<attemptsSnapshot._snapshot.docChanges.length ; i ++){
            let recallData =attemptsSnapshot._snapshot.docChanges[i].doc.data.value.mapValue.fields
            if(recallData.status.booleanValue){
              dict.attempt=i+1
              break
            }else if(i === attemptsSnapshot._snapshot.docChanges.legnth-1){
              dict.attempt="-"
              break
            }else{
              continue
            }
          }
        }
        return dict
      }catch(error){
        console.log(error)
      }
    }
    const fetchDocuments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'celeb_grphical_password_shuffle'));
        const docs = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const tempDict = { id: doc.id, ...doc.data() };
            const document = await fetchDocument(doc.data().name);
            tempDict['report'] = document['report'];
            tempDict['attempt'] = document['attempt'];
            return tempDict;
          })
        );
        const sortedDocs = docs.sort((a, b) => {
          const dateA = new Date(a.time.seconds * 1000 + a.time.nanoseconds / 1000000);
          const dateB = new Date(b.time.seconds * 1000 + b.time.nanoseconds / 1000000);
          return dateA - dateB;
        });
        setDocuments(sortedDocs);
      } catch (error) {
        console.error('Error getting documents:', error);
        setError('Error getting documents: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="document-container">
      <h2>Celebrity Graphical Password Shuffle</h2>
      {documents.length > 0 ? (
        <table className="document-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Time</th>
              <th>Setup</th>
              <th>Setup Time Taken</th>
              <th>Name</th>
              <th>Recall 1 Status</th>
              <th>No.of digit recalled successfully</th>
              <th>Time taken to Recall 1</th>
              <th>Recall 2 Status</th>
              <th>No.of digit recalled successfully</th>
              <th>Time taken to Recall 2</th>
              <th>Recall 3 Status</th>
              <th>No.of digit recalled successfully</th>
              <th>Time taken to Recall 3</th>
              <th>No. of attempts before success</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.id}</td>
                <td>{new Date(doc.time.seconds * 1000).toLocaleString()}</td>
                <td>{doc.setup.join(', ')}</td>
                <td>{doc.setup_time_taken} seconds</td>
                <td>{doc.name}</td>
                <td>{doc.report[0].status.toString()}</td>
                <td>{doc.report[0].recalled}</td>
                <td>{doc.report[0].time_taken}</td>
                <td>{doc.report[1].status.toString()}</td>
                <td>{doc.report[1].recalled}</td>
                <td>{doc.report[1].time_taken}</td>
                <td>{doc.report[2].status.toString()}</td>
                <td>{doc.report[2].recalled}</td>
                <td>{doc.report[2].time_taken}</td>
                <td>{doc.attempt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No documents found.</div>
      )}
    </div>
  );
};

export default CelebGraphicalPassword;
