<div class="responsive-head">
  
    <button class="sidebar-toggler"><span></span><span></span><span></span></button>
</div>

<div class="sidebar-overlay"></div>

<div class="sidebar">
    <button class="collapse-btn">
        <i class="fas fa-angle-left"></i>
    </button>
    <div class="sidebar-content">
        

        <a id="logoutButton" class="store-link" target="_blank">
           Logout
            <i class="fas fa-external-link-alt"></i>
        </a>

        <ul class="links">
            <li>
                <a href="{{ route('home') }}" class="link">
                    <i class="fas fa-home"></i>
                    <span>Home</span>
                </a>
            </li>
            <li>
                <a href="{{ route('products.index') }}" class="link">
                    <i class="fas fa-list"></i>
                    <span>Products</span>
                </a>
            </li>
            <li>
                <a href="{{ route('categories.index') }}" class="link">
                    <i class="fas fa-shopping-bag"></i>
                    <span>Categories</span>
                </a>
            </li>
         
           
        </ul>
    </div>
</div>
<form id="logoutForm" action="{{ route('logout') }}" method="POST" style="display: none;">
        @csrf
    </form>

