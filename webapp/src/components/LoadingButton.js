import Button from "react-bootstrap/Button";
import { useState, useEffect } from 'react';

function LoadingButton(props) {
  const [isLoading, setLoading] = useState(false);

  const action = props.action;

  useEffect(() => {
    if (isLoading) {
        action().then(() => {
        setLoading(false);
      });
    }
  }, [action, isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <Button
      type="submit"
      variant="primary"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
    >
      {isLoading ? "Cargando..." : "Enviar"}
    </Button>
  );
}

export default LoadingButton;
