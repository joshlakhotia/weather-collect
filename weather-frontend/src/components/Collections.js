import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Collections() {
    const [collections, setCollections] = useState();

    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchCollections = async () => {
            const url = `http://localhost:8080/api/collection/user/1`;
            const init = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "weatherToken"
                    )}`,
                },
            };

            const response = await fetch(url, init);
            if (response.ok) {
                setCollections(await response.json());
                console.log(collections);
            } else {
                setCollections([]);
            }
        };

        fetchCollections();
    }, []);

    return (
        <div className="">
            {collections &&
                collections.map((collection) => (
                    <div key={collection.weatherCollectionId}>
                        <p>{collection.name}</p>
                    </div>
                ))}
        </div>
    );
}
