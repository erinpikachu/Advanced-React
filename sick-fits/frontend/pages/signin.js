import styled from 'styled-components';
import RequestReset from '../components/RequestReset';
import SignUp from '../components/SignUp';
import SignIn from '../components/SingIn';

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 2rem;
`;

export default function SignInPage() {
  return (
    <GridStyles>
      <SignIn />
      <SignUp />
      <RequestReset />
    </GridStyles>
  );
}
