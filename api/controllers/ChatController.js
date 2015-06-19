/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index : function(req,res){
        return res.view();
    },

    //ChatModelをwatchしてpublishCreateを拾えるようにする
    watch : function(req,res){
        if(req.isSocket){
            Chat.watch(req.socket);
            console.log('watch Chat');
        }
    },
 
    //投稿の追加 追加と同時にpublishする
    create: function(req, res){
        console.log('create');
        Chat.create({text: req.param('text')}).exec(function(err, result) {
         Chat.publishCreate(result);
         return res.json(result);
         });
    }

};

