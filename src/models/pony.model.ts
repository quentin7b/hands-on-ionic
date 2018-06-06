export class Pony {

    avatarUrl: string;
    name: string;
    description: string;
    isFavorite: boolean;

    constructor(name, description, avatarUrl, isFavorite) {
        this.name = name
        this.description = description
        this.avatarUrl = avatarUrl
        this.isFavorite = isFavorite
    }  
}