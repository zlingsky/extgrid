//页面加载当前js文件时，设置其它辅助js文件的加载路径
Ext.Loader.setPath({
	'zling.com': 'js',//当前行定义命名空间'zling.com'映射到文件目录'./js'文件夹
});
Ext.require('zling.com.zwindow');//请求资源'zling.com.zwindow'，就是在文件夹./js下有zwindow.js这个文件
                                 //并且在这个文件中定义了一个zling.com.zwindow这样一个'类'

//定义数据模型，在当前文件定义是因为当创建窗口的datagrid时，希望数据模型是动态的，可以临时指定。
Ext.define('User',{
	extend:'Ext.data.Model',
	fields:['name', 'email', 'phone']
});//更丰富的配置，请参照官方文档

/*
 * 当页面加载完成后，将执行下面的方法，主要是对页面的菜单按钮绑定操作事件
 */
Ext.onReady(function(){	
	//两个菜单按钮，用来操作窗口数据
	var bt=Ext.get("apendline");//第一个按钮
	var bt2=Ext.get("replace");//第二个按钮
	//每一个菜单注册一个点击事件，用来激发菜单操作响应
	//第一个按钮绑定事件，实现在活动窗口中增加一行数据的功能
	bt.on("click",function(){
		var awind=Ext.WindowManager.getActive();//当多个窗口被创建和打开后，获得活动窗口（最上面的），
		var gid=awind.getGrid();//从活动窗口对象得到它包含的datagrid对象的ID
		var dg=Ext.getCmp(gid);//获得datagrid对象组件
		var st=dg.getStore();//获得datagrid的Store对象
		//store对象增加一行数据
		st.add([{name: '刘备', email: 'liubei@163.com', phone: '888-111-1224'}]);
	});
	//第二个按钮绑定事件，实现在活动窗口中更换数据的功能
	bt2.on("click",function(){
		var awind=Ext.WindowManager.getActive();
		var dg=Ext.getCmp(awind.getGrid());
		var st=dg.getStore();
		st.loadData([
	       	        { name: '刘备', email: 'liubei@163.com', phone: '888-111-1224' },
	    	        { name: '关羽', email: 'guanyu@163.com', phone: '888-222-1234' },
	    	        { name: '张飞', email: 'zhangfei@163..com', phone: '888-222-1244' },
	    	        { name: '赵云', email: 'zhaoyun@163.com', phone: '888-222-1254' }
	    	    ],false);//'false'代表更换,'true'代表从后追加
	});
	//两个菜单按钮，打开不同窗口，点击时将创建新窗口并打开
	var open1=Ext.get("openwindow1");//打开第一个业务窗口的按钮
	var open2=Ext.get("openwindow2");//打开第二个业务窗口的按钮
	//打开窗口1的事件函数
	open1.on('click',function(){
		var s=new zling.com.zwindow();//创建实例对象，用它来动态创建窗口
		//给即将要打开的窗口准备数据，可以来自于远程ajax
		var store1=Ext.create('Ext.data.Store',{
    		model:'User',
    		data:[
				{ name: 'Lisa', email: 'lisa@simpsons.com', phone: '666-111-1228' },
				{ name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234' },
				{ name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244' },
				{ name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254' }
    		  ]
    	});
		var colums=[
			        {header: '姓    名a', dataIndex: 'name'},
			        {header: '邮    箱', dataIndex: 'email', flex:1,
			            editor: {
			                xtype: 'textfield',
			                allowBlank: false
			            }
			        },
			        {header: '联系电话', dataIndex: 'phone', editor: 'textfield'}
			    ];
		var w1=s.createWindow({wid:'mywindow',gid:'mygrid',title:'个人信息',store:store1,ctitle:colums});
		w1.show();
	});
	open2.on('click',function(){
		var s=new zling.com.zwindow();
		var store2=Ext.create('Ext.data.Store',{
    		model:'User',
    		data:[
				{ name: '关羽', email: 'guanyu@simpsons.com', phone: '555-111-1228' },
				{ name: '张飞', email: 'zhangfei@simpsons.com', phone: '555-222-1234' },
				{ name: '赵云', email: 'zhaoyun@simpsons.com', phone: '555-222-1244' },
				{ name: '刘备', email: 'liubei@simpsons.com', phone: '555-222-1254' }
    		  ]
    	});
		var colums=[
			        {header: '姓    名', dataIndex: 'name'},
			        {header: '邮    箱', dataIndex: 'email', flex:1,
			            editor: {
			                xtype: 'textfield',
			                allowBlank: false
			            }
			        },
			        {header: '联系电话', dataIndex: 'phone', editor: 'textfield'}
			    ];
		var w2=s.createWindow({wid:'customwin',gid:'customgrid',title:'用户信息',store:store2,ctitle:colums});
		w2.show();
	});
});
