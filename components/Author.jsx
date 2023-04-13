import Image from "next/image"

const Author = ({ author }) => {
   return (
      <div className="text-center mt-20 mb-8 p-12 rounded-lg relative bg-black bg-opacity-20">
         <div className="absolute -top-14 right-0 left-0">
            <Image
               alt="author"
               className="align-middle rounded-full"
               src={author.photo.url}
               height="100"
               width="100"
               unoptimized
            />
         </div>
         <h3 className="text-white my-4 text-xl font-bold">
            {author.name}
         </h3>
         <p className="text-lg text-white">
            {author.bio}
         </p>
      </div>
   )
}

export default Author