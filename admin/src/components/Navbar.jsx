"use client";
import Link from "next/link";
import styles from "@/css/navbar.module.css";
import "@/css/globals.css";
import { FaUserCircle } from "react-icons/fa";
import { AiFillSchedule } from "react-icons/ai";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { useState } from "react";
const Navbar = () => {
  const [isUserTool, setUserTool] = useState(false);
  const [isBookTool, setBookTool] = useState(false);
  const [isServicesTool, setServicesTool] = useState(false);
  const [isReviewTool, setReviewTool] = useState(false);
  const [isHomeTool, setHomeTool] = useState(false);
  const handleUserToolEnter = () => {
    setUserTool(true);
  };
  const handleUserToolLeave = () => {
    setUserTool(false);
  };
  const handleBookToolEnter = () => {
    setBookTool(true);
  };
  const handleBookToolLeave = () => {
    setBookTool(false);
  };
  const handleServicesToolEnter = () => {
    setServicesTool(true);
  };
  const handleServicesToolLeave = () => {
    setServicesTool(false);
  };
  const handleReviewToolEnter = () => {
    setReviewTool(true);
  };
  const handleReviewToolLeave = () => {
    setReviewTool(false);
  };
  const handleHomeToolEnter = () => {
    setHomeTool(true);
  };
  const handleHomeToolLeave = () => {
    setHomeTool(false);
  };
  return (
    <>
      <section className={styles.nav_container}>
        <nav>
          <ul>
            <li onMouseLeave={handleHomeToolLeave}>
              <Link href={"/"} onMouseEnter={handleHomeToolEnter}>
                <span onMouseEnter={handleHomeToolEnter}>
                  <AiFillHome />
                </span>
                {isHomeTool && (
                  <div className={styles.user_tool}>
                    <span>inicio</span>
                  </div>
                )}
              </Link>
            </li>
            <li onMouseLeave={handleUserToolLeave}>
              <Link href={"/users"} onMouseEnter={handleUserToolEnter}>
                <span onMouseEnter={handleUserToolEnter}>
                  <FaUserCircle />
                </span>
                {isUserTool && (
                  <div className={styles.user_tool}>
                    <span>usuarios</span>
                  </div>
                )}
              </Link>
            </li>
            <li onMouseLeave={handleBookToolLeave}>
              <Link href={"/bookings"} onMouseEnter={handleBookToolEnter}>
                <span onMouseEnter={handleBookToolEnter}>
                  <AiFillSchedule />
                </span>
                {isBookTool && (
                  <div className={styles.user_tool}>
                    <span>citas</span>
                  </div>
                )}
              </Link>
            </li>
            <li onMouseLeave={handleServicesToolLeave}>
              <Link href={"/services"} onMouseEnter={handleServicesToolEnter}>
                <span onMouseEnter={handleServicesToolEnter}>
                  <MdOutlineMiscellaneousServices />
                </span>
                {isServicesTool && (
                  <div className={styles.user_tool}>
                    <span>servicios</span>
                  </div>
                )}
              </Link>
            </li>
            {/*
            <li onMouseLeave={handleReviewToolLeave}>
              <Link href={""} onMouseEnter={handleReviewToolEnter}>
                <span onMouseEnter={handleReviewToolEnter}>
                  <AiFillStar />
                </span>
                {isReviewTool && (
                  <div className={styles.user_tool}>
                    <span>reseñas</span>
                  </div>
                )}
              </Link>
            </li>
            */}
          </ul>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
