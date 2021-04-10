import styled from "styled-components";
import Card from '@material-ui/core/Card';
import { Image, List } from "@solid/react";
import { ListItemAvatar } from "@material-ui/core";


// ESTILOS GENERALES DE LA APLICACIÓN 
export const DivConFondo = styled.div`
background-image: url("./img/fondo.jpg");
background-repeat: repeat;
height: 100%;
width: 100%;
position: absolute;
`;


// ESTILO SECCIÓN LOGIN
export const LoginWrapper = styled.section`
display: flex;
flex: 1 0 auto;
align-items: center;
justify-content: center;
background-image: url("./img/concentric-hex-pattern_2x.png");
background-repeat: repeat;
padding: 60px 0;
`;

export const LoginContainer = styled(Card)`
box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
background-color: white;
max-width: 900px;
margin: 50px 20px;
width: 100%;
flex: 1 0 auto;
`;

// ESTILOS DE HOME

export const ProfileWrapper = styled.section`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
`;
export const ProfileContainer = styled.div`
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
  max-width: 900px;
  margin: 0 20px;
  width: 100%;
  flex: 1 0 auto;
`;

export const Header = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: rgba(7, 65, 102, 0.7);
  padding: 30px 20px;
`;

export const ImageRounded = styled(Image)`
  width: 250px;
  height: 250px;
  border-radius: 50%;
`;

export const FormRenderContainer = styled.div`
  border: 1px solid #dae0e6;
  min-height: 40px;
  padding: 20px 40px 0px 40px;
`;


// ESTILOS DE LA LISTA DE AMIGOS

export const FriendsWrapper = styled.section`
display: flex;
flex: 1 0 auto;
align-items: center;
justify-content: center;

padding: 60px 0;
`;

export const FriendsCard = styled(Card)`
box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
background-color: white;
max-width: 900px;
margin: 0 20px;
width: 100%;
flex: 1 0 auto;
`;

export const FriendImage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export const FriendsList = styled(List)`
  list-style: none;
`;

export const FriendImageContainer = styled(ListItemAvatar)`
    margin: 0.5em; 
`;