Ext.define('zling.com.zwindow',{
	//用来测试的
	test:function(){
		var me=this;
		Ext.Msg.alert('this is test function!');
		return me;
	},
	//所传的参数要求:{wid:'mywindow',gid:'mygrid',title:'mytitle'}
	createWindow:function(arg){
		if(!arg.wid){
			Ext.Msg.alert('所传参数缺少或错误，请确认后重新创建');
			return;
		};
		if(Ext.getCmp(arg.wid)){alert('已创建')}else{alert('未创建')} ;
		return a=Ext.getCmp(arg.wid)?a:Ext.create('Ext.window.Window',{
			id:arg.wid,
		    title: arg.title,
		    height: 400,
		    width: 600,
		    layout: 'fit',
		    getGrid:function(){return arg.gid},
		    items: [{
		    	xtype:'grid',
		    	id:arg.gid,
		    	store:arg.store,
			    columns: arg.ctitle,
			    selModel: 'cellmodel',
			    plugins: {
			        ptype: 'cellediting',
			        clicksToEdit: 1
			    },
			    height: 400,
			    width: 600,
		        listeners: {
		           celldblclick:{fn:function(ths,td, cellIndex, record, tr, rowIndex, e, eOpts){
		        	   		alert("单元格索引："+cellIndex+"邮件地址："+record.data.email);
		        	   		record.set('name','八戒');
		        	   		record.set('email','xyz@abc.com');
		        	   		record.set('phone','911-911-911');
		        	   }
		           }
		        }
		    }],
		    closeAction:'destroy'
		});
	}
})