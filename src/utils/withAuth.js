import React, { useState, useEffect, useRef } from 'react';
const withAuth = (WrappedComponent) => {

    /***************************************************************/
    const Wrapper = (input) => {
       
        return (
            <WrappedComponent {...input} />
        );
    }
    return Wrapper;
}

export default withAuth;