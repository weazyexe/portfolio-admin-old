/* eslint-disable */
import * as React from "react";

import { ReactComponent as Github } from "../../assets/github.svg";
import { ReactComponent as Telegram } from "../../assets/telegram.svg";
import { ReactComponent as Twitter } from "../../assets/twitter.svg";
import { ReactComponent as Vk } from "../../assets/vk.svg";
import { ReactComponent as Instagram } from "../../assets/instagram.svg";

import Contacts from "../../models/Contacts";

import '../../styles/views.scss';

interface ContactsProps {
    contacts: Contacts
    className?: string
}

const ContactsView = (props: ContactsProps) => {
    const { contacts, className } = props;

    return <div className={className}>
        <a href={contacts.telegram} target="_blank">
            <div className='main-link-icon'>
                <Telegram />
            </div>
        </a>

        <a href={contacts.github} target="_blank">
            <div className='main-link-icon'>
                <Github />
            </div>
        </a>

        <a href={contacts.twitter} target="_blank">
            <div className='main-link-icon'>
                <Twitter />
            </div>
        </a>

        <a href={contacts.instagram} target="_blank">
            <div className='main-link-icon'>
                <Instagram />
            </div>
        </a>

        <a href={contacts.vk} target="_blank">
            <div className='main-link-icon'>
                <Vk />
            </div>
        </a>
    </div>
};

export default ContactsView;
