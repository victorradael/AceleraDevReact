import React, { useEffect, useState } from "react";

import axios from "axios";
import moment from "moment";

import Contact from "./Contact";

const Contacts = ({ search, sort }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      const response = await axios.get(
        "https://5e82ac6c78337f00160ae496.mockapi.io/api/v1/contacts"
      );

      setContacts(response.data);
    }

    fetchContacts();
  }, []);

  function processContacts(search = "", sort, data) {
    let list = data;

    if (search.length > 0) {
      list = data.filter((contact) => contact.name.includes(search, 0));
    }

    switch (sort) {
      case "name":
      case "country":
      case "company":
      case "department":
        list.sort((a, b) => {
          if (a[sort] < b[sort]) return -1;
          if (a[sort] > b[sort]) return 1;
          return 0;
        });
        break;
      case "admissionDate":
        list.sort(
          (a, b) => new Date(a.admissionDate) - new Date(b.admissionDate)
        );
        break;
      default:
    }

    return list.map((contact) => ({
      ...contact,
      admissionDate: moment(contact.admissionDate).format("DD/MM/YYYY"),
    }));
  }

  return (
    <div data-testid="contacts" className="container">
      <article className="contact">
        <span className="contact__avatar" />
        <span className="contact__data">Nome</span>
        <span className="contact__data">Telefone</span>
        <span className="contact__data">País</span>
        <span className="contact__data">Admissão</span>
        <span className="contact__data">Empresa</span>
        <span className="contact__data">Departamento</span>
      </article>
      {processContacts(search, sort, contacts).map((contact) => (
        <Contact {...contact} key={contact.id} />
      ))}
    </div>
  );
};
export default Contacts;
