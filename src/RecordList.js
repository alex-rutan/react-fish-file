import React, { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import RecordCard from "./RecordCard";
import "./RecordList.css";


/** RecordList: List that returns record cards.
 * 
 *  Context: currentUser, getAllRecords
 *  State: recordList
 */

function RecordList() {
  const { currentUser, getAllRecords } = useContext(UserContext);
  const [recordList, setRecordList] = useState([]);

  useEffect(
    function getRecords() {
      async function getRecordsResponse() {
        const records = await getAllRecords(currentUser.username);
        setRecordList(records);
      }
      getRecordsResponse();
    },
    [currentUser.username, getAllRecords]
  )

  return (
    <div className="RecordList">
      {recordList.map(record => (
        <RecordCard key={record.id} record={record} />
      ))}
    </div>
  )
}

export default RecordList;