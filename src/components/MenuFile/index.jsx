import { useState, useContext } from "react";
import fileContext from "../../context/fileContext";
import style from "./style.module.css";
import rename from "../../function/rename";
import downloadFile from "../../function/downloadFile";
import readFiles from "../../function/readFiles";
import readFolder from "../../function/readFolder";
import InfoFile from "../InfoFile";
import getInfo from "../../function/getInfo"



export default function MenuFile({ file }) {
    const { setFiles, setFolder } = useContext(fileContext)

    const [showInput, setShowInput] = useState(false);
    const [newName, setNewName] = useState('');
    const [infoShow, setInfoShow] = useState(false);
    const [info, setInfo] = useState({});

    function handClickRename() {
        setShowInput(false);
        rename(localStorage.path, file, newName)
        readFolder(localStorage.path).then(res => setFolder(res))
        readFiles(localStorage.path).then(res => setFiles(res))
    }
    function handClickInfo() {
        setInfoShow(!infoShow);
        getInfo(file).then((information) => {
            setInfo(information);
        })
    }

    return (
        <div className={style.menu} >
            <div className={style.option} onClick={() => (setShowInput(!showInput))}> Rename </div>
            {showInput && <div><input type="text" onChange={(e) => setNewName(e.target.value)} />
                <button className={style.rename} onClick={handClickRename}>Rename</button>
            </div>}

            <div className={style.option} onClick={() => (downloadFile(file))}> Download </div>

            <div className={style.option} onClick={() => (handClickInfo())}>Information</div>

            {infoShow && <div className={style.info}>{<InfoFile info={info} />}</div>
            }

            <div className={style.option}>Delete</div>
        </div>
    )
}