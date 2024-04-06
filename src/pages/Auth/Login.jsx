import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { toast } from "sonner";
import isEmpty from "../../utils/isEmpty";

const Login = () => {
  const dispatch = useDispatch();
  const { userinfo } = useSelector(({ auth }) => auth);
  const { users } = useSelector(({ users }) => users);

  const navigate = useNavigate();
  const [data, setData] = useState({ username: "" });
  const onChange = e => setData({ ...data, [e.target.name]: e.target.value });

  useEffect(() => {
    if (!isEmpty(userinfo)) navigate("/");
  }, [navigate, userinfo]);

  const onSubmit = async e => {
    e.preventDefault();
    const user = users.find(user => user.username === data.username);
    if (isEmpty(user)) return toast.error("No user");
    dispatch(setCredentials({ ...user }));
    toast.success("Successfully logged in");
  };

  return (
    <div className="relative">
      <form onSubmit={onSubmit} className="grid place-content-center min-h-[calc(100vh-74px-48px)]">
        <Card className="min-w-[300px] mx:min-w-[380px] sm:min-w-[450px] px-6">
          <CardHeader className="text-center">
            <h1 className="text-3xl font-bold pt-4">Sign in</h1>
            <h6>Sign in to access your account</h6>
          </CardHeader>
          <CardContent className="space-y-5 py-6">
            <div>
              <label htmlFor="username">Username</label>
              <Input type="username" name="username" placeholder="username" onChange={onChange} />
            </div>
            <Button type="submit" variant="default" className="w-full">
              Log in
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default Login;
