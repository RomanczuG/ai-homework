import { Route, Redirect } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // import your supabase client

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = supabase.auth.getUser();

  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
