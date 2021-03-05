const GetEstablishmentTypeIcon = (establishmentType) => {
    if (!establishmentType) {
        return "FalsyValue";
    }
    return `/assets/category_${establishmentType
        .replace("&", "-")
        .toLowerCase()}.svg`;
};

export default GetEstablishmentTypeIcon;
