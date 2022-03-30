import LoginPrompt from '../AuthButton/LoginPrompt';
import UsersCollectionInfo from './UsersCollectionInfo';

const UsersCollection = ({ accounts }) => {
  const isConnected = Boolean(accounts[0]);

  return (
    <>
       {isConnected ? (
         <UsersCollectionInfo/>
       ): (
         <LoginPrompt/>
       )} 
    </>  
  )
};

export default UsersCollection;