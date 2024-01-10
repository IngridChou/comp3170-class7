import { useEffect, useState } from "react"

export default function Article({ article }) {
    const [author, setAuthor] = useState(null);

        useEffect(() => {
            const url =`http://hn.algolia.com/api/v1/users/:${article.author}`;

            async function fetchAuthor() {
                const response = await fetch(url);
                const data = await response.json();
                setAuthor(data);
            }

            fetchAuthor();

        }, []);

    return(
        <div className="article">
            <p>
            <a href={article.url}>{article.title}</a>
            <br />
            {article.text}
            </p>
            {author ?
           ( <p className="author">
                By {author.username}
                <span>{author.about}</span>
            </p>)
            :
            <p>By Unknow</p>}
        </div>
    )
}