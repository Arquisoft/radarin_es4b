import React, { Fragment } from 'react';
import data from "@solid/query-ldflex";

import { Value, Link } from "@solid/react";
import { Header, ProfileContainer, ProfileWrapper, FormRenderContainer, ImageRounded } from "../../AppStyles";

function Home(props) {

  const webId = sessionStorage.getItem("webId");
  const image = data[webId].vcard_hasPhoto;

  return (
      <ProfileWrapper data-testid="profile-component">
          <ProfileContainer>

              <Fragment>
                  <Header>
                      <ImageRounded src={image} defaultSrc="/img/defaultUser.png" />
                  </Header>
                  <FormRenderContainer>
                      <h2><Value src="user.name"></Value></h2>
                      <p><Link href={`${webId}`}>URL POD</Link></p>
                      <p><Link href="user.inbox">Bandeja de entrada</Link></p>
                  </FormRenderContainer>
              </Fragment>

          </ProfileContainer>
      </ProfileWrapper>
  );
}

export default Home;