import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserContext from "./UserContext";
import HomePage from "./HomePage";
import LocationList from "./LocationList";
import LocationDetails from "./LocationDetails";
import AddLocationForm from "./AddLocationForm";
import RecordList from "./RecordList";
import AddRecordForm from "./AddRecordForm";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";


/** AppRoutes: Routes component that house all the application routes
 * 
 *  Context: currentUser
 */

function AppRoutes() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="AppRoutes">
      {currentUser ?
        <Routes>
          <Route path="/locations" element={<LocationList onlyShowFavorites={false} />} />
          <Route path="/locations/:location_id" element={<LocationDetails />} />
          <Route path="/locations/new" element={<AddLocationForm />} />
          <Route path="/records" element={<RecordList />} />
          <Route path="/records/new" element={<AddRecordForm />} />
          {/* <Route path="/profile" element={<EditProfileForm />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        : <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/" element={<HomePage />} />
          <Route element={<Navigate replace to="/" />} />
        </Routes>}
    </div>
  );
}

export default AppRoutes;