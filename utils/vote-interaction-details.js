function voteInteractionDetails(voteStatus, buttonType){
   if(voteStatus === "not voted"){
        if(buttonType === "upvote"){
            return {increment: 1, voteStatus: "upvoted"}
        }
        if(buttonType === "downvote"){
            return {increment: -1, voteStatus: "downvoted"}
        }
   }
   if(voteStatus === "upvoted"){
        if(buttonType === "upvote"){
            return {increment: -1, voteStatus: "not voted"}
        }
        if(buttonType === "downvote"){
            return {increment: -2, voteStatus: "downvoted"}
        }
   }
   if(voteStatus === "downvoted"){
        if(buttonType === "upvote"){
            return {increment: 2, voteStatus: "upvoted"}
        }
        if(buttonType === "downvote"){
            return {increment: 1, voteStatus: "not voted"}
        }
   }
   return {}
}

export default voteInteractionDetails