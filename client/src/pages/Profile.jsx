import React from "react";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setfile] = useState(undefined);
  const [fileperc, setfileperc] = useState(0);
  const [uploaderror, setuploaderror] = useState(false);
  // console.log(file);
  const [formData, setformData] = useState({});
  // console.log(formData);
  // console.log(fileperc);
  // console.log(uploaderror);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name; // for unique file name always
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is' + progress + '% done');
        setfileperc(Math.round(progress));
        console.log(fileperc);
      },
      (error) => {
        setuploaderror(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setformData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setfile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          src={formData.avatar || currentUser.avatar}
          alt=""
        />
        <p className="text-sm self-center">
          {uploaderror ? (
            <span className="text-red-700">Error Image Upload(Image must be less than 2mb)</span>
          ) : fileperc > 0 && fileperc < 100 ? (
            <span className="text-slate-700">{`Uploading ${fileperc}`}</span>
          ) : fileperc === 100 ? (
            <span className="text-green-700">Image succesfully uploaded</span>
          ) : (
            ''
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
