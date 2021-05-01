import React from 'react';
import { getText } from '../translations/i18n';

function Banned() {

    return (
        <div>
            <h1 className="h1Card">{getText("ban.suspended")}</h1>
            <p> </p>
            <p className="alert">{getText("ban.contact")}</p>
        </div>
    );
}

export default Banned;