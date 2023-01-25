import * as React from "react";

export function confirmCheck(
    checkedYes, setCheckedYes
) {
    const handleChange = () => {
        setCheckedYes(!checkedYes);
    };

    return(
        <React.Fragment>
            <div className={"confirm-container"}>
                <h5 className={"confirm-container-title"}>
                    Would you like to receive confirmation of the results from the test persons? <br></br>
                    <u>Note:</u> If several people share an account, this setting is helpful to compensate this problem.
                </h5>
                <div className={"confirm-container-checkbox-outer"}>
                    <div className={"confirm-container-checkbox"}>
                        <label className={"confirm-container-title"}>
                            <input id={"checkbox-css"}
                                type="checkbox" 
                                checked={checkedYes}
                                onChange={handleChange}
                            />
                            <span id={"span-css"}></span>
                            Yes
                        </label>
                    </div>
                    <div className={"confirm-container-checkbox"}>
                        <label className={"confirm-container-title"}>
                            <input id={"checkbox-css"}
                                type="checkbox" 
                                checked={!checkedYes}
                                onChange={handleChange}
                            />
                            <span id={"span-css"}></span>
                            No
                        </label>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default function PublicCheck(
    checkedYes, setCheckedYes
) {
    const handleChange = () => {
        setCheckedYes(!checkedYes);
    };

    return(
        <React.Fragment>
            <div className={"confirm-container"}>
                <h5 className={"confirm-container-title"}>
                    Do you want to capture any playlists or are you only interested in the public playlists?
                </h5>
                <div className={"confirm-container-checkbox-outer"}>
                    <div className={"confirm-container-checkbox"}>
                        <label className={"confirm-container-title"}>
                            <input id={"checkbox-css"}
                                type="checkbox" 
                                checked={checkedYes}
                                onChange={handleChange}
                            />
                            <span id={"span-css"}></span>
                            Any Playlists
                        </label>
                    </div>
                    <div className={"confirm-container-checkbox"}>
                        <label className={"confirm-container-title"}>
                            <input id={"checkbox-css"}
                                type="checkbox" 
                                checked={!checkedYes}
                                onChange={handleChange}
                            />
                            <span id={"span-css"}></span>
                            Public Playlists
                        </label>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}