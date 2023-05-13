import { useEffect, useState } from "react";
import { Disponibility } from "../models/Disponibility";
import { Authenticate } from "../components/Authenticate";
import { User } from "../models/User";
import { DisponibilityInfo } from "../components/DisponibilityInfo";
import { DisponibilityService } from "../services/disponibilityService";
import { Link } from "react-router-dom";
import { NotFoundPage } from "./NotFoundPage";
import { savedDispo, savedUser, removeSomething } from "../helpers/localStorageAccesses";

export function Reserve(): JSX.Element {
  const [userLogged, setUserLogged] = useState<User>();
  const [dispoInCuestion, setDispoInCuestion] = useState<Disponibility>();
  const [confirmed, setConfirmed] = useState<boolean>();
  const service: DisponibilityService = new DisponibilityService();
  const dateHour: string[] | undefined = confirmed
    ? dispoInCuestion?.dateIn.split(" ")
    : undefined;

  const handleConfirm = () => {
    service.save(dispoInCuestion!, userLogged!.token!).then((res: Response) => {
      setConfirmed(res.ok);
    });
  };

  const onLoggedIn = (user: User) => {
    const dispo: Disponibility = savedDispo()!;
    dispo.userId = user.id;
    setUserLogged(user);
    setDispoInCuestion(dispo);
    removeSomething("dispo");
  };

  useEffect(() => {
    const user: User | null = savedUser();
    const dispo: Disponibility | null = savedDispo();
    if (dispo) {
      //if null becouse trying to access via url
      setDispoInCuestion(dispo);
      if (user) {
        dispo.userId = user.id;
        setUserLogged(user);
        removeSomething("dispo");
      }
    }
  }, []);

  return (
    <div className="container">
      {!dispoInCuestion ? (
        <NotFoundPage />
      ) : !userLogged ? (
        <Authenticate
          title="to continue, you have to Log In or register"
          handleFinished={onLoggedIn}
        />
      ) : confirmed == undefined ? (
        <>
          <h1 className="normal">complete your reserve,</h1>
          <h1> {userLogged.firstname}</h1>
          <div>
            <h2 className="normal">Make reserve of:</h2>
            <DisponibilityInfo dispo={dispoInCuestion!} />
          </div>
          <Link to="/">
            <button className="animated-button-def">cancel</button>
          </Link>
          <button onClick={handleConfirm} className="animated-button-def">
            confirm
          </button>
        </>
      ) : confirmed ? (
        <>
          <h1>Reserved succesfully!</h1>
          <p>
            We will wait for you on the <b>{dateHour![0]}</b> before the{" "}
            <b>{dateHour![1].split(":")[0]}</b> o'clock in our facility to
            proceed with the payment and the retirement of the car.
          </p>
          <p style={{ color: "#ef233c" }}>
            If you will not retire the car before the <b>{dateHour![0]}</b> at
            12:00, your reservation will be <b>automatically deleted</b>.
          </p>
          <h5 className="normal">we will redirect you to the home page</h5>
          <Link to="/">
            <button className="animated-button-def">go to home page</button>
          </Link>
        </>
      ) : (
        <>
          <h1>We cannot make your reserve</h1>
          <h5>Please try again later</h5>
          <Link to="/">
            <button className="animated-button-def">go to home page</button>
          </Link>
        </>
      )}
    </div>
  );
}
