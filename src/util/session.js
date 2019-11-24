export const setLoginState = (isLoggedIn, action) => {
    localStorage.setItem("HVSLoggedIn", isLoggedIn.toString());
    action(isLoggedIn);
}

