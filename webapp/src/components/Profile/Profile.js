import React, { Fragment } from 'react';
import data from "@solid/query-ldflex";
import { getText } from '../../translations/i18n'
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
                      <p><Link href={`${webId}`}>{getText("profile.pod")}</Link></p>
                      <p><Link href="user.inbox">{getText("profile.bandeja")}</Link></p>
                  </FormRenderContainer>
              </Fragment>

          </ProfileContainer>
      </ProfileWrapper>
  );
}

export default Home;