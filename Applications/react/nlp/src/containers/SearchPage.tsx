import React from 'react';
import { SearchBar } from '../components/Search/SearchBar';
import { Instruction } from '../components/Shared/Instruction';

export function SearchPage(): JSX.Element {

    const instructions: string[] = [
        "Enter the url of the website to be analyzed, e.g. review sites",
        "This application will predict the sentiment of the review using tfidf",
        "This application will also be able to retrieve the relevant reviews when you enter a search term using cosine similarity"
    ];

    return (
        <div>
            <Instruction instructions={instructions} title={"Step 1: Scrap the website"} />
            <SearchBar />
        </div>
    )
}